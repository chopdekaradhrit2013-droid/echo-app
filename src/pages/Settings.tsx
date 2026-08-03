import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft, Lock, Shield, Palette, Bell, User, HardDrive, HelpCircle, Info, LogOut } from 'lucide-react'

export default function Settings() {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const sections = [
    {
      items: [
        { icon: Lock, label: 'Privacy', color: 'bg-echo-blue/20 text-echo-blue' },
        { icon: Shield, label: 'Security', color: 'bg-purple-500/20 text-purple-400' },
        { icon: Palette, label: 'Appearance', color: 'bg-pink-500/20 text-pink-400' },
      ],
    },
    {
      items: [
        { icon: Bell, label: 'Notifications', color: 'bg-orange-500/20 text-orange-400' },
        { icon: User, label: 'Account', color: 'bg-cyan-500/20 text-cyan-400' },
        { icon: HardDrive, label: 'Storage', color: 'bg-yellow-500/20 text-yellow-400' },
      ],
    },
    {
      items: [
        { icon: HelpCircle, label: 'Help', color: 'bg-white/10 text-white/70' },
        { icon: Info, label: 'About Echo', color: 'bg-white/10 text-white/70' },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full animate-fade">
      <div className="px-4 pt-3 pb-3 flex items-center gap-2.5">
        <button onClick={() => navigate(-1)} className="text-white/60">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 space-y-3 pb-8">
        {sections.map((section, si) => (
          <div key={si} className="glass rounded-2xl overflow-hidden">
            {section.items.map((item, i) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3.5 p-3.5 hover:bg-white/5 ${i > 0 ? 'border-t border-white/5' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.color}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        ))}

        <button
          onClick={async () => {
            await signOut()
            navigate('/login')
          }}
          className="w-full glass rounded-2xl p-3.5 flex items-center gap-3.5 text-red-400 hover:bg-red-500/10"
        >
          <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center">
            <LogOut className="w-4.5 h-4.5" />
          </div>
          <span className="text-sm font-medium">Sign Out</span>
        </button>

        <p className="text-center text-xs text-white/25 mt-4">Echo v1.0.0 • 2026</p>
      </div>
    </div>
  )
}
