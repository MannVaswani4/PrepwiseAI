'use client';
import { useState, useEffect } from 'react';

const MOCK_STATS = {
  totalSessions: 12,
  avgScore: 7.4,
  completedSessions: 10,
  recentSessions: [
    { id: '1', role: 'Software Engineer', date: '2024-03-31', score: 8.5 },
    { id: '2', role: 'AI Engineer', date: '2024-03-29', score: 6.8 },
    { id: '3', role: 'Product Manager', date: '2024-03-25', score: 7.2 },
  ]
};

export default function Dashboard() {
  const [stats, setStats] = useState(MOCK_STATS);

  return (
    <div className="container dashboard">
      <header className="dash-header">
        <h1>Overview</h1>
        <a href="/interview/new" className="btn-primary">New Interview</a>
      </header>

      <div className="stats-grid">
        <div className="glass stat-card">
          <label>Total Sessions</label>
          <div className="value">{stats.totalSessions}</div>
        </div>
        <div className="glass stat-card">
          <label>Average Score</label>
          <div className="value">{stats.avgScore}<span>/10</span></div>
        </div>
        <div className="glass stat-card">
          <label>Completion Rate</label>
          <div className="value">{((stats.completedSessions / stats.totalSessions) * 100).toFixed(0)}%</div>
        </div>
      </div>

      <section className="recent-activity">
        <h2>Recent Interviews</h2>
        <div className="glass session-list">
          {stats.recentSessions.map(session => (
            <div key={session.id} className="session-item">
              <div className="role-info">
                <strong>{session.role}</strong>
                <span>{session.date}</span>
              </div>
              <div className="score-badge" style={{ 
                color: session.score > 7 ? 'var(--accent)' : 'var(--primary)' 
              }}>
                {session.score}
              </div>
              <button className="btn-outline-sm">View Report</button>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .dashboard { padding: 4rem 0; }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }
        h1 { font-size: 2rem; font-weight: 700; }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .stat-card { padding: 2rem; }
        .stat-card label { display: block; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem; }
        .stat-card .value { font-size: 2.5rem; font-weight: 800; font-variant-numeric: tabular-nums; }
        .stat-card .value span { font-size: 1rem; color: var(--text-muted); font-weight: 400; }
        
        .recent-activity h2 { margin-bottom: 1.5rem; font-size: 1.5rem; }
        .session-list { overflow: hidden; }
        .session-item {
          display: flex;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border);
        }
        .session-item:last-child { border-bottom: none; }
        .role-info { flex: 1; display: flex; flex-direction: column; }
        .role-info span { font-size: 0.85rem; color: var(--text-muted); }
        .score-badge { font-size: 1.25rem; font-weight: 700; margin-right: 2rem; }
        .btn-outline-sm {
          background: transparent;
          border: 1px solid var(--border);
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .btn-outline-sm:hover { color: white; border-color: white; }
        .btn-primary { background: var(--primary); padding: 0.75rem 1.5rem; color: white; }
      `}</style>
    </div>
  );
}
