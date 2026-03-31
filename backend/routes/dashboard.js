const express = require('express');
const prisma = require('../lib/prisma');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const sessions = await prisma.interviewSession.findMany({
      where: { userId: req.user.userId },
      include: { questions: true },
    });

    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === 'COMPLETED').length;
    
    // Average score across all answering questions
    const allAnswers = sessions.flatMap(s => s.questions).filter(q => q.mlScore !== null);
    const avgScore = allAnswers.length > 0 
      ? allAnswers.reduce((acc, q) => acc + q.mlScore, 0) / allAnswers.length 
      : 0;

    res.json({
      totalSessions,
      completedSessions,
      avgScore: avgScore.toFixed(1),
      recentSessions: sessions.slice(-5).reverse()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;
