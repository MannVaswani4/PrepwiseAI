'use client';
import { useState, useEffect, useRef } from 'react';

export default function InterviewRoom() {
  const [status, setStatus] = useState('idle'); // idle, listening, processing, speaking
  const [transcript, setTranscript] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const transcriptEndRef = useRef(null);

  // Initialize Interview
  useEffect(() => {
    const startInterview = async () => {
      // Mock start for now - in real app, this comes from the setup page
      const res = await fetch('http://localhost:5000/interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ role: 'Software Engineer' })
      });
      const data = await res.json();
      setSessionId(data.session.id);
      setCurrentQuestion(data.firstQuestion);
      setTranscript([{ type: 'ai', text: data.firstQuestion.questionText }]);
      if (data.firstQuestion.audioUrl) playAudio(data.firstQuestion.audioUrl);
    };
    startInterview();
  }, []);

  const playAudio = (url) => {
    setStatus('speaking');
    const audio = new Audio(`http://localhost:5000${url}`);
    audio.onended = () => setStatus('idle');
    audio.play();
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];
    
    mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      sendAnswer(audioBlob);
    };
    
    mediaRecorderRef.current.start();
    setIsRecording(true);
    setStatus('listening');
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setStatus('processing');
  };

  const sendAnswer = async (blob) => {
    const formData = new FormData();
    formData.append('audio', blob);
    formData.append('sessionId', sessionId);
    formData.append('questionId', currentQuestion.id);

    try {
      const res = await fetch('http://localhost:5000/interview/answer', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });
      const data = await res.json();
      
      setTranscript(prev => [
        ...prev, 
        { type: 'user', text: data.evaluation.transcript },
        { type: 'ai', text: data.nextQuestion.questionText }
      ]);
      setCurrentQuestion(data.nextQuestion);
      if (data.nextQuestion.audioUrl) playAudio(data.nextQuestion.audioUrl);
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  return (
    <div className="interview-room">
      <div className="main-stage">
        {/* AI Visualization */}
        <div className="ai-viewer glass">
          <div className="video-placeholder">
            <div className={`ai-avatar ${status === 'speaking' ? 'pulse' : ''}`}>
               AI
            </div>
          </div>
          <div className="status-indicator">
            {status === 'listening' && <span className="listening">● Listening...</span>}
            {status === 'processing' && <span className="processing">Processing Answer...</span>}
            {status === 'speaking' && <span className="speaking">AI is speaking...</span>}
            {status === 'idle' && <span>Ready</span>}
          </div>
        </div>

        {/* Controls */}
        <div className="controls glass">
          <button 
            className={`mic-btn ${isRecording ? 'active' : ''}`}
            onClick={toggleRecording}
          >
            {isRecording ? '🛑 Stop' : '🎤 Start Answer'}
          </button>
        </div>
      </div>

      {/* Sidebar: Transcript & Feedback */}
      <aside className="transcript-sidebar glass">
        <h3>Interview Transcript</h3>
        <div className="transcript-list">
          {transcript.map((m, i) => (
            <div key={i} className={`message ${m.type}`}>
               <label>{m.type === 'ai' ? 'AI Interviewer' : 'You'}</label>
               <p>{m.text}</p>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>
        
        <div className="live-feedback glass">
          <h4>Live Evaluation</h4>
          <p>Analyzing clarity and technical depth...</p>
        </div>
      </aside>

      <style jsx>{`
        .interview-room {
          display: grid;
          grid-template-columns: 1fr 400px;
          height: calc(100vh - 80px);
          background: #000;
        }
        .main-stage {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 2rem;
        }
        .ai-viewer {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .video-placeholder {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ai-avatar {
          width: 150px;
          height: 150px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          box-shadow: 0 0 40px var(--primary);
        }
        .ai-avatar.pulse {
          animation: avatarPulse 1.5s infinite;
        }
        @keyframes avatarPulse {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
          70% { box-shadow: 0 0 0 50px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        .status-indicator { margin-top: 2rem; font-weight: 600; font-size: 1.1rem; }
        .listening { color: var(--danger); animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        
        .controls {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mic-btn {
          padding: 1rem 3rem;
          font-size: 1.2rem;
          background: var(--primary);
          color: white;
          border-radius: 50px;
        }
        .mic-btn.active { background: var(--danger); }
        
        /* Sidebar */
        .transcript-sidebar {
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 2rem;
          overflow: hidden;
        }
        .transcript-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem; padding-right: 1rem; }
        .message label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .message p { margin-top: 0.25rem; }
        .message.ai p { color: var(--accent); }
        
        .live-feedback { margin-top: 2rem; padding: 1.5rem; border-color: var(--primary); }
        .live-feedback h4 { font-size: 0.9rem; margin-bottom: 0.5rem; text-transform: uppercase; color: var(--primary); }
      `}</style>
    </div>
  );
}
