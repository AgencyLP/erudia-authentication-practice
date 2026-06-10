import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuth } from './context/authContextValue'

function LoadingScreen() {
  return (
    <main className="loading-screen">
      <div className="brand">
        <div className="brand-mark">E</div>
        <div className="brand-name">
          Erudia<em> AI</em>
        </div>
      </div>
      <p>Loading your learning space...</p>
    </main>
  )
}

function HomeRedirect() {
  const { currentUser, authLoading } = useAuth()

  if (authLoading) {
    return <LoadingScreen />
  }

  return <Navigate to={currentUser ? '/dashboard' : '/login'} replace />
}

function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useAuth()

  if (authLoading) {
    return <LoadingScreen />
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

function PublicOnlyRoute({ children }) {
  const { currentUser, authLoading } = useAuth()

  if (authLoading) {
    return <LoadingScreen />
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
