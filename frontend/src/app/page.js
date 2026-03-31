'use client';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="fade-in">Land Your Dream Job with <span>AI Mastery</span></h1>
          <p className="fade-in" style={{ animationDelay: '0.1s' }}>
            PrepWise AI is your personal interview coach. Practice with realistic AI-led 
            interviews, get real-time feedback, and track your progress.
          </p>
          <div className="cta-group fade-in" style={{ animationDelay: '0.2s' }}>
            <a href="/register" className="btn-primary-lg">Get Started for Free</a>
            <a href="#demo" className="btn-outline-lg">Watch Demo</a>
          </div>
          
          <div className="hero-visual fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="glass mock-ui">
              <div className="mock-header">
                 <div className="dot red"></div>
                 <div className="dot yellow"></div>
                 <div className="dot green"></div>
              </div>
              <div className="mock-body">
                <div className="mock-sidebar"></div>
                <div className="mock-main">
                   <div className="mock-video">
                      <div className="ai-pulse"></div>
                      <p>AI Interviewer is speaking...</p>
                   </div>
                   <div className="mock-stats"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to <span>succeed</span></h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card glass">
              <div className="icon">🎙️</div>
              <h3>Adaptive Mock Interviews</h3>
              <p>AI adjusts difficulty based on your real-time performance.</p>
            </div>
            <div className="feature-card glass">
              <div className="icon">🧠</div>
              <h3>Hybrid Evaluation</h3>
              <p>Linguistic analysis combined with deep LLM feedback.</p>
            </div>
            <div className="feature-card glass">
              <div className="icon">📊</div>
              <h3>Skill Analytics</h3>
              <p>Identify weak spots in System Design, DSA, or Behavioral.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          padding: 8rem 0 4rem;
          text-align: center;
          overflow: hidden;
        }
        h1 {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }
        h1 span {
          background: linear-gradient(90deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          font-size: 1.25rem;
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto 3rem;
        }
        .cta-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 5rem;
        }
        .btn-primary-lg {
          background: var(--primary);
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          color: white;
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
        }
        .btn-outline-lg {
          background: transparent;
          border: 1px solid var(--border);
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
        }
        
        .hero-visual {
          perspective: 1000px;
        }
        .mock-ui {
          height: 500px;
          max-width: 900px;
          margin: 0 auto;
          transform: rotateX(10deg);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .mock-header {
          height: 40px;
          border-bottom: 1px solid var(--border);
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 0 1rem;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }
        
        /* Features */
        .features { padding: 8rem 0; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          padding: 2.5rem;
          text-align: left;
          transition: transform 0.3s ease;
        }
        .feature-card:hover { transform: translateY(-10px); }
        .feature-card h3 { margin: 1rem 0 0.5rem; }
        .icon { font-size: 2rem; }
        
        .ai-pulse {
          width: 60px;
          height: 60px;
          background: var(--primary);
          border-radius: 50%;
          margin: 0 auto 1rem;
          box-shadow: 0 0 20px var(--primary);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </main>
  )
}
