'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewInterview() {
  const [role, setRole] = useState('Software Engineer');
  const [resume, setResume] = useState(null);
  const router = useRouter();

  const handleStart = (e) => {
    e.preventDefault();
    // In a real app, we'd upload the resume to the backend here
    router.push('/interview/session-123'); // Mock session ID
  };

  return (
    <div className="container setup-container fade-in">
      <div className="glass setup-card">
        <h1>Interview Setup</h1>
        <p>Configure your session to get started</p>
        
        <form onSubmit={handleStart}>
          <div className="input-group">
            <label>Select Your Target Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Software Engineer</option>
              <option>AI Engineer</option>
              <option>Product Manager</option>
              <option>Data Scientist</option>
            </select>
          </div>

          <div className="input-group">
            <label>Upload Resume (Optional)</label>
            <div className="file-upload">
               <input type="file" onChange={(e) => setResume(e.target.files[0])} />
               <div className="upload-ui">
                 <span className="icon">📄</span>
                 <span>{resume ? resume.name : 'Click to upload or drag and drop'}</span>
               </div>
            </div>
            <p className="hint">AI will tailor questions based on your experience.</p>
          </div>

          <button type="submit" className="btn-primary-full">Start Interview</button>
        </form>
      </div>

      <style jsx>{`
        .setup-container { padding: 6rem 0; display: flex; justify-content: center; }
        .setup-card { width: 100%; max-width: 600px; padding: 4rem; }
        h1 { margin-bottom: 0.5rem; font-size: 2rem; }
        p { color: var(--text-muted); margin-bottom: 3rem; }
        .input-group { margin-bottom: 2rem; }
        label { display: block; margin-bottom: 0.75rem; font-weight: 600; }
        select {
          width: 100%;
          padding: 1rem;
          background: var(--bg-dark);
          border: 1px solid var(--border);
          color: white;
          border-radius: 8px;
          outline: none;
          font-size: 1rem;
        }
        .file-upload { position: relative; height: 120px; border: 2px dashed var(--border); border-radius: 12px; }
        .file-upload input { position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2; }
        .upload-ui { 
          position: absolute; inset: 0; display: flex; flex-direction: column; 
          align-items: center; justify-content: center; color: var(--text-muted);
        }
        .upload-ui .icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .hint { font-size: 0.8rem; margin-top: 0.5rem; }
        .btn-primary-full {
          width: 100%;
          background: var(--primary);
          padding: 1.25rem;
          color: white;
          font-size: 1.1rem;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
}
