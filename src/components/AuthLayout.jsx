import { Link } from 'react-router-dom'

export default function AuthLayout({ children, eyebrow = 'start learning —' }) {
  return (
    <main className="auth-shell">
      <section className="story" aria-label="About Erudia">
        <div className="brand">
          <div className="brand-mark">E</div>
          <div className="brand-name">
            Erudia<em> AI</em>
          </div>
        </div>

        <div className="story-mid">
          <div className="story-eyebrow">{eyebrow}</div>
          <h1 className="story-h">
            A tutor that <em>actually teaches.</em>
          </h1>
          <p className="story-p">
            Upload your notes. ARIA reads them. Then she teaches you concept by concept — asking,
            listening, adapting — until you've genuinely mastered them. The help students need,
            right when they need it.
          </p>

          <div className="story-q">
            <div className="story-q-t">
              “Erudia didn't give me the answer. It made me find it. That's when I actually
              remembered it.”
            </div>
            <div className="story-q-w">— Pilot student, Chulalongkorn</div>
          </div>
        </div>

        <div className="story-bot">
          <div>
            <div className="story-stat-n">7</div>
            <div className="story-stat-l">pipeline steps</div>
          </div>
          <div>
            <div className="story-stat-n">6</div>
            <div className="story-stat-l">teaching roles</div>
          </div>
          <div>
            <div className="story-stat-n">70+</div>
            <div className="story-stat-l">students validated</div>
          </div>
        </div>
      </section>

      <section className="form-side" aria-label="Authentication form">
        {children}
      </section>
    </main>
  )
}

export function AuthTabs({ active }) {
  return (
    <div className="tabs" aria-label="Authentication tabs">
      <Link className={`tab ${active === 'login' ? 'active' : ''}`} to="/login">
        Sign in
      </Link>
      <Link className={`tab ${active === 'signup' ? 'active' : ''}`} to="/signup">
        Create account
      </Link>
    </div>
  )
}
