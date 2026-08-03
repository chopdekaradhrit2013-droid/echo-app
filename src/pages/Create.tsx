import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera } from 'lucide-react'

export default function Create() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full animate-fade">
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-white/60">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Create Post</h1>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-6">
        <div className="aspect-square rounded-3xl glass-strong flex flex-col items-center justify-center gap-3 mb-5 border border-dashed border-white/10">
          <div className="w-14 h-14 rounded-full echo-logo flex items-center justify-center shadow-[0_0_20px_rgba(79,140,255,0.4)]">
            <Camera className="w-7 h-7 text-white" />
          </div>
          <p className="text-sm text-white/50">Tap to add photo or video</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/40 mb-1 block">Caption</label>
            <textarea
              placeholder="What's on your mind?"
              rows={3}
              className="w-full bg-echo-card border border-echo-border rounded-2xl p-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-echo-blue/40 resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['#EchoApp', '#Future', '#Connect'].map((tag) => (
              <button key={tag} className="px-3 py-1 rounded-full glass text-xs text-white/60">
                {tag}
              </button>
            ))}
          </div>

          <button className="w-full py-3.5 rounded-2xl bg-echo-blue text-white font-semibold text-base shadow-[0_0_20px_rgba(79,140,255,0.4)] create-btn">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
