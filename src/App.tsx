import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Home from './pages/Home'
import Discover from './pages/Discover'
import Create from './pages/Create'
import Chats from './pages/Chats'
import ChatDetail from './pages/ChatDetail'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import BottomNav from './components/BottomNav'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen bg-echo-bg flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-echo-blue border-t-transparent animate-spin" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function PublicOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen bg-echo-bg flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-echo-blue border-t-transparent animate-spin" />
      </div>
    )
  }
  if (user) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <div className="max-w-md mx-auto h-full min-h-screen bg-echo-bg relative overflow-hidden">
      <Routes>
        <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
        <Route path="/signup" element={<PublicOnly><Signup /></PublicOnly>} />
        <Route path="/forgot-password" element={<PublicOnly><ForgotPassword /></PublicOnly>} />

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path="/chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
        <Route path="/chats/:id" element={<ProtectedRoute><ChatDetail /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <BottomNav />
    </div>
  )
}
