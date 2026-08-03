import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await resetPassword(email.trim())
    setLoading(false)

    if (error) {
      setError(error)
      return
    }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-echo-bg flex flex-col items-center justify-center px-6 animate-fade">
        <div className="w-16 h-16 rounded-full bg-echo-blue/20 flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-echo-blue" />
        </div>
        <h1 className="text-xl font-bold mb-2">Check your email</h1>
        <p className="text-white/60 text-sm text-center max-w-xs mb-8">
          We sent a password reset link to <span className="text-white font-medium">{email}</span>.
        </p>
        <Link to="/login" className="px-6 py-3 rounded-2xl bg-echo-blue text-sm font-semibold">
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-echo-bg flex flex-col px-6 py-10 animate-fade">
      <Link to="/login" className="flex items-center gap-2 text-white/60 text-sm mb-8">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold mb-2">Reset password</h1>
        <p className="text-white/50 text-sm mb-8">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

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
                className="w-full bg-echo-card border border-echo-border rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-echo-blue/50 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-echo-blue text-white font-semibold text-base shadow-[0_0_20px_rgba(79,140,255,0.35)] disabled:opacity-60 transition"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  )
}
