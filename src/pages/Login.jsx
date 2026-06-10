import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout, { AuthTabs } from '../components/AuthLayout'
import { ArrowIcon, GoogleIcon, LockIcon, MailIcon, StatusMessage } from '../components/FormPieces'
import { continueWithGoogle, logInWithEmail } from '../services'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleEmailLogin(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await logInWithEmail({ email, password })
      navigate('/dashboard')
    } catch (authError) {
      setError(authError.message || 'Could not sign in. Please check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setError('')
    setLoading(true)

    try {
      await continueWithGoogle()
      navigate('/dashboard')
    } catch (authError) {
      setError(authError.message || 'Could not sign in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout eyebrow="welcome back —">
      <form className="form-card" onSubmit={handleEmailLogin}>
        <div className="form-eyebrow">hi again —</div>
        <h2 className="form-h">
          Sign in to <em>Erudia.</em>
        </h2>
        <p className="form-sub">
          New here? <Link to="/signup">Create an account</Link>
        </p>

        <AuthTabs active="login" />

        <div className="field">
          <label className="field-lbl" htmlFor="login-email">
            Email
          </label>
          <div className="field-input">
            <MailIcon />
            <input
              id="login-email"
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="field-lbl" htmlFor="login-password">
            <span>Password</span>
            <span className="field-note">Forgot?</span>
          </label>
          <div className="field-input">
            <LockIcon />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              className="field-show"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="row">
          <label className="check">
            <input type="checkbox" defaultChecked /> Remember me
          </label>
        </div>

        <StatusMessage>{error}</StatusMessage>

        <button className="btn-mah" type="submit" disabled={loading}>
          <span>{loading ? 'Signing in...' : 'Sign in to Erudia'}</span>
          <ArrowIcon />
        </button>

        <div className="divider">or continue with</div>

        <div className="sso sso-single">
          <button className="sso-btn" type="button" onClick={handleGoogleLogin} disabled={loading}>
            <GoogleIcon />
            Google
          </button>
        </div>

        <p className="fine">
          By signing in you agree to our <a href="#terms">Terms</a> and{' '}
          <a href="#privacy">Privacy Policy</a>.
        </p>
      </form>
    </AuthLayout>
  )
}
