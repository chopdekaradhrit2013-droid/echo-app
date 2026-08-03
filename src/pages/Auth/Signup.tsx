import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, AtSign } from 'lucide-react'

function isStrongPassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/])[A-Za-z\d@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/]{8,}$/
  return regex.test(password)
}

export default function Signup() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!isStrongPassword(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.')
      return
    }

    if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username must be at least 3 characters and contain only letters, numbers, and underscores.')
      return
    }

    setLoading(true)
    const { error } = await signUp(email.trim(), password, username.trim(), fullName.trim())
    setLoading(false)

    if (error) {
      setError(error)
      return
    }

    setSuccess(true)
  }

  async function handleGoogle() {
    setError('')
    const { error } = await signInWithGoogle()
    if (error) setError(error)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-echo-bg flex flex-col items-center justify-center px-6 animate-fade">
        <div className="w-16 h-16 rounded-full bg-echo-blue/20 flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-echo-blue" />
        </div>
        <h1 className="text-xl font-bold mb-2">Check your email</h1>
        <p className="text-white/60 text-sm text-center max-w-xs mb-8">
          We sent a verification link to <span className="text-white font-medium">{email}</span>.  
          Click the link to activate your account.
        </p>
        <Link
          to="/login"
          className="px-6 py-3 rounded-2xl bg-echo-blue text-sm font-semibold"
        >
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-echo-bg flex flex-col px-6 py-8 animate-fade">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl echo-logo flex items-center justify-center shadow-[0_0_30px_rgba(79,140,255,0.35)] mb-4">
            <span className="text-2xl font-bold text-white">E</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Join Echo</h1>
          <p className="text-white/50 text-sm mt-1">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/35" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full bg-echo-card border border-echo-border rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-echo-blue/50 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Username</label>
            <div className="relative">
              <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/35" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                required
                placeholder="unique_username"
                className="w-full bg-echo-card border border-echo-border rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-echo-blue/50 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/35" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-echo-card border border-echo-border rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-echo-blue/50 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/35" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Strong password"
                className="w-full bg-echo-card border border-echo-border rounded-2xl py-3 pl-11 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-echo-blue/50 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
            <p className="text-[10px] text-white/35 mt-1.5">
              Min 8 characters • Uppercase • Lowercase • Number • Special character
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-echo-blue text-white font-semibold text-base shadow-[0_0_20px_rgba(79,140,255,0.35)] disabled:opacity-60 transition mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-echo-bg px-3 text-white/40">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full py-3 rounded-2xl glass flex items-center justify-center gap-3 text-sm font-medium hover:bg-white/5 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.71z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-white/50 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-echo-blue font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
