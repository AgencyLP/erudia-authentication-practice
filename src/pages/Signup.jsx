import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout, { AuthTabs } from '../components/AuthLayout'
import { ArrowIcon, GoogleIcon, LockIcon, MailIcon, StatusMessage, UserIcon } from '../components/FormPieces'
import { continueWithGoogle, signUpWithEmail } from '../services'

export default function Signup() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleEmailSignup(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signUpWithEmail({ fullName, email, password })
      navigate('/dashboard')
    } catch (authError) {
      setError(authError.message || 'Could not create your account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignup() {
    setError('')
    setLoading(true)

    try {
      await continueWithGoogle()
      navigate('/dashboard')
    } catch (authError) {
      setError(authError.message || 'Could not continue with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout eyebrow="start learning —">
      <form className="form-card" onSubmit={handleEmailSignup}>
        <div className="form-eyebrow">a tutor that teaches —</div>
        <h2 className="form-h">
          Start with <em>Erudia.</em>
        </h2>
        <p className="form-sub">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <AuthTabs active="signup" />

        <div className="field">
          <label className="field-lbl" htmlFor="signup-name">
            Full name
          </label>
          <div className="field-input">
            <UserIcon />
            <input
              id="signup-name"
              type="text"
              placeholder="Harsh Pandey"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="field-lbl" htmlFor="signup-email">
            Email
          </label>
          <div className="field-input">
            <MailIcon />
            <input
              id="signup-email"
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
          <label className="field-lbl" htmlFor="signup-password">
            <span>Password</span>
          </label>
          <div className="field-input">
            <LockIcon />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength="6"
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

        <StatusMessage>{error}</StatusMessage>

        <button className="btn-mah" type="submit" disabled={loading}>
          <span>{loading ? 'Creating account...' : 'Create your account'}</span>
          <ArrowIcon />
        </button>

        <div className="divider">or continue with</div>

        <div className="sso sso-single">
          <button className="sso-btn" type="button" onClick={handleGoogleSignup} disabled={loading}>
            <GoogleIcon />
            Google
          </button>
        </div>

        <p className="fine">
          By creating an account you agree to our <a href="#terms">Terms</a> and{' '}
          <a href="#privacy">Privacy Policy</a>.
        </p>
      </form>
    </AuthLayout>
  )
}
