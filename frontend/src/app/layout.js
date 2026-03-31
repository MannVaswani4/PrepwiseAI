import './globals.css'

export const metadata = {
  title: 'PrepWise AI | Interview Preparation Platform',
  description: 'Master your interviews with AI-powered mock sessions and real-time feedback.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="container nav-content">
            <div className="logo">Prep<span>Wise</span> AI</div>
            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="/login" className="btn-secondary">Login</a>
              <a href="/register" className="btn-primary">Start Free</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
