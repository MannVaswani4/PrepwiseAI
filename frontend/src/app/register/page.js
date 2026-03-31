'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    // TODO: Call API
    router.push('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="glass auth-card fade-in">
        <h2>Create Account</h2>
        <p>Start your journey to interview mastery</p>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary-full">Get Started</button>
        </form>
        <p className="footer-links">
           Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
      <style jsx>{`
        .auth-container {
          height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-card { width: 100%; max-width: 450px; padding: 3rem; }
        h2 { margin-bottom: 0.5rem; }
        p { color: var(--text-muted); margin-bottom: 2rem; }
        .input-group { margin-bottom: 1.5rem; }
        label { display: block; margin-bottom: 0.5rem; color: var(--text-main); font-size: 0.9rem; }
        input {
          width: 100%;
          background: var(--bg-dark);
          border: 1px solid var(--border);
          padding: 0.8rem;
          border-radius: 8px;
          color: white;
          outline: none;
        }
        input:focus { border-color: var(--primary); }
        .btn-primary-full {
          width: 100%;
          background: var(--primary);
          padding: 1rem;
          color: white;
          font-size: 1rem;
          margin-top: 1rem;
        }
        .footer-links { margin-top: 2rem; text-align: center; font-size: 0.9rem; }
        .footer-links a { color: var(--primary); font-weight: 600; }
      `}</style>
    </div>
  );
}
