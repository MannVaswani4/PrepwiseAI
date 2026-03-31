const { OpenAI } = require('openai');
const path = require('path');
const fs = require('fs');

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

/**
 * Transcribes audio buffer to text using Whisper.
 */
async function transcribeAudio(audioBuffer) {
  if (!openai) return "Transcription unavailable (No API Key)";
  try {
    // Whisper requires a file-like object with a name
    const tempFile = path.join('/tmp', `audio-${Date.now()}.webm`);
    fs.writeFileSync(tempFile, audioBuffer);
    
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFile),
      model: "whisper-1",
    });

    fs.unlinkSync(tempFile);
    return transcription.text;
  } catch (error) {
    console.error("Transcription Error:", error);
    throw error;
  }
}

/**
 * Converts text to speech and returns the URL/path to the audio file.
 */
async function textToSpeech(text) {
  if (!openai) return null;
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });
    
    // In a real production app, we'd upload this to S3. 
    // Here we'll save to a public folder in the backend.
    const publicDir = path.join(__dirname, '../public/audio');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    
    const fileName = `speech-${Date.now()}.mp3`;
    const filePath = path.join(publicDir, fileName);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    
    return `/public/audio/${fileName}`;
  } catch (error) {
    console.error("TTS Error:", error);
    throw error;
  }
}

module.exports = { transcribeAudio, textToSpeech };
