import { useAuth } from '../contexts/AuthContext'
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react'

export default function Home() {
  const { profile } = useAuth()

  return (
    <div className="flex flex-col h-full pb-20 animate-fade">
      <div className="px-4 pt-3 pb-3">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar">
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-echo-blue to-echo-purple p-[2px]">
              <div className="w-full h-full rounded-full bg-echo-bg flex items-center justify-center">
                <span className="text-lg font-bold text-echo-blue">+</span>
              </div>
            </div>
            <span className="text-[10px] text-white/50">Your Story</span>
          </div>
          {['maya_', 'arjun', 'priya', 'dev'].map((name) => (
            <div key={name} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-echo-blue to-echo-purple p-[2px]">
                <div className="w-full h-full rounded-full bg-echo-card" />
              </div>
              <span className="text-[10px] text-white/50">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-echo-bg to-purple-950/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 rounded-3xl glass-strong flex items-center justify-center shadow-[0_0_40px_rgba(79,140,255,0.2)]">
            <div className="w-20 h-20 rounded-2xl echo-logo flex items-center justify-center">
              <span className="text-3xl font-bold">E</span>
            </div>
          </div>
        </div>

        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4">
          <button className="flex flex-col items-center gap-0.5">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-[10px]">24.8K</span>
          </button>
          <button className="flex flex-col items-center gap-0.5">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px]">1.2K</span>
          </button>
          <button className="flex flex-col items-center gap-0.5">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px]">Share</span>
          </button>
          <button className="flex flex-col items-center gap-0.5">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
          </button>
        </div>

        <div className="absolute bottom-3 left-4 right-16">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-full bg-echo-card" />
            <span className="font-semibold text-sm">{profile?.username || 'user'}</span>
            <button className="text-xs text-echo-blue font-medium">Follow</button>
          </div>
          <p className="text-sm text-white/90 leading-snug">
            The future of connection is here. Welcome to Echo ✨{' '}
            <span className="text-white/40">#EchoApp</span>
          </p>
        </div>
      </div>
    </div>
  )
}
