import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MoreHorizontal } from 'lucide-react'

export default function Profile() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full pb-20 animate-fade">
      <div className="relative h-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-echo-bg">
        <div className="absolute top-2.5 right-3">
          <button onClick={() => navigate('/settings')} className="w-8 h-8 rounded-full glass flex items-center justify-center">
            <MoreHorizontal className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div className="px-4 -mt-10 relative z-10">
        <div className="w-20 h-20 rounded-full border-4 border-echo-bg bg-echo-card overflow-hidden shadow-lg" />
        <div className="mt-2.5 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold">{profile?.full_name || 'User'}</h1>
            <p className="text-sm text-white/45">@{profile?.username || 'username'}</p>
          </div>
          <button className="px-4 py-1.5 rounded-full bg-echo-blue text-sm font-semibold shadow-[0_0_12px_rgba(79,140,255,0.35)]">
            Edit Profile
          </button>
        </div>
        <p className="text-sm text-white/75 mt-2.5 leading-relaxed">
          {profile?.bio || 'Building the future of connection • Echo'}
        </p>
        <div className="flex gap-5 mt-3">
          <div><span className="font-bold text-sm">0</span><span className="text-xs text-white/45 ml-1">Posts</span></div>
          <div><span className="font-bold text-sm">0</span><span className="text-xs text-white/45 ml-1">Followers</span></div>
          <div><span className="font-bold text-sm">0</span><span className="text-xs text-white/45 ml-1">Following</span></div>
        </div>
      </div>

      <div className="flex border-b border-white/5 mt-4 px-4">
        <button className="flex-1 py-2.5 text-sm font-medium text-echo-blue border-b-2 border-echo-blue">Posts</button>
        <button className="flex-1 py-2.5 text-sm font-medium text-white/35">Reels</button>
        <button className="flex-1 py-2.5 text-sm font-medium text-white/35">Tagged</button>
      </div>

      <div className="flex-1 p-4 flex items-center justify-center text-white/40 text-sm">
        No posts yet
      </div>
    </div>
  )
}
