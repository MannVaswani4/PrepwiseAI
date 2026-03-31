const axios = require('axios');
const prisma = require('../lib/prisma');
const { authenticateToken } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = require('express').Router();

const { transcribeAudio, textToSpeech } = require('../lib/ai-utils');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

// Initialize session with first question TTS
router.post('/start', authenticateToken, async (req, res) => {
  const { role, resumeText } = req.body;
  try {
    const session = await prisma.interviewSession.create({
      data: { userId: req.user.userId, role, status: 'IN_PROGRESS', resumeText }
    });

    const questionText = `Welcome! Let's start the ${role} interview. Can you tell me about yourself?`;
    let audioUrl = null;
    
    if (process.env.OPENAI_API_KEY) {
      audioUrl = await textToSpeech(questionText);
    }

    const firstQuestion = await prisma.questionAndAnswer.create({
      data: { sessionId: session.id, questionText, difficultyLevel: 1 }
    });

    res.status(201).json({ session, firstQuestion: { ...firstQuestion, audioUrl } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start session' });
  }
});

// Handle user answer (Audio or Text)
router.post('/answer', authenticateToken, upload.single('audio'), async (req, res) => {
  const { sessionId, questionId, textFallback } = req.body;

  try {
    const session = await prisma.interviewSession.findUnique({ where: { id: sessionId } });
    if (!session) return res.status(404).json({ error: 'Session not found' });

    // 1. Transcribe if audio exists
    let transcript = textFallback;
    if (req.file && process.env.OPENAI_API_KEY) {
      transcript = await transcribeAudio(req.file.buffer);
    }

    // 2. Call ML Service to evaluate
    const evalData = (await prisma.questionAndAnswer.findUnique({ where: { id: questionId } }));
    const evalResponse = await axios.post(`${ML_SERVICE_URL}/evaluate`, {
      question: evalData.questionText,
      answer: transcript,
      role: session.role
    });

    const { ml_score, label, llm_feedback } = evalResponse.data;

    // 3. Save result
    const updatedQA = await prisma.questionAndAnswer.update({
      where: { id: questionId },
      data: { userAnswerTranscript: transcript, mlScore: ml_score, llmFeedback: llm_feedback, answeredAt: new Date() }
    });

    // 4. Adaptive Logic & Next Question TTS
    let nextDifficulty = updatedQA.difficultyLevel;
    if (ml_score > 7) nextDifficulty = Math.min(nextDifficulty + 1, 5);
    else if (ml_score < 4) nextDifficulty = Math.max(nextDifficulty - 1, 1);

    const nextQuestionText = `That was a ${label} answer. Now, let's dive deeper into a level ${nextDifficulty} topic. Can you explain more about your technical approach?`;
    let nextAudioUrl = null;
    if (process.env.OPENAI_API_KEY) {
      nextAudioUrl = await textToSpeech(nextQuestionText);
    }

    const nextQuestion = await prisma.questionAndAnswer.create({
      data: { sessionId, questionText: nextQuestionText, difficultyLevel: nextDifficulty }
    });

    res.json({ evaluation: { ml_score, label, llm_feedback, transcript }, nextQuestion: { ...nextQuestion, audioUrl: nextAudioUrl } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process answer' });
  }
});

module.exports = router;
