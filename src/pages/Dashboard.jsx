import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContextValue'
import { logOut } from '../services'

export default function Dashboard() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setError('')
    setLoading(true)

    try {
      await logOut()
      navigate('/login')
    } catch (logoutError) {
      setError(logoutError.message || 'Could not log out. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="dashboard-shell">
      <section className="dashboard-card">
        <div className="brand dashboard-brand">
          <div className="brand-mark">E</div>
          <div className="brand-name">
            Erudia<em> AI</em>
          </div>
        </div>

        <p className="form-eyebrow">welcome to your study space —</p>
        <h1 className="dashboard-title">
          Hi{currentUser?.displayName ? `, ${currentUser.displayName}` : ''}. Ready to learn?
        </h1>
        <p className="dashboard-copy">
          Your authentication flow is working. This protected dashboard only appears after Firebase
          signs a user in.
        </p>

        <div className="dashboard-details">
          <div>
            <span>Email</span>
            <strong>{currentUser?.email}</strong>
          </div>
          <div>
            <span>User ID</span>
            <strong>{currentUser?.uid}</strong>
          </div>
        </div>

        {error && <p className="status-message error">{error}</p>}

        <button className="btn-mah dashboard-button" type="button" onClick={handleLogout} disabled={loading}>
          {loading ? 'Logging out...' : 'Log out'}
        </button>
      </section>
    </main>
  )
}
