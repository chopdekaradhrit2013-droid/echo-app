import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, MessageCircle, User } from 'lucide-react'

const HIDDEN_PATHS = ['/login', '/signup', '/forgot-password', '/create', '/settings']

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname

  if (HIDDEN_PATHS.some(p => path.startsWith(p)) || path.startsWith('/chats/')) {
    return null
  }

  const items = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/discover', icon: Search, label: 'Discover' },
    { path: '/create', icon: null, label: 'Create' },
    { path: '/chats', icon: MessageCircle, label: 'Chats' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-strong border-t border-white/5 z-50">
      <div className="flex items-center justify-around py-1.5 pb-safe">
        {items.map((item) => {
          const isActive = path === item.path
          if (item.path === '/create') {
            return (
              <button
                key="create"
                onClick={() => navigate('/create')}
                className="flex flex-col items-center gap-0.5 w-14 py-1"
              >
                <div className="w-11 h-11 -mt-4 rounded-full echo-logo flex items-center justify-center create-btn border-[3px] border-echo-bg shadow-[0_0_16px_rgba(79,140,255,0.45)]">
                  <span className="text-white text-2xl font-light leading-none">+</span>
                </div>
              </button>
            )
          }

          const Icon = item.icon!
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 w-14 py-1 ${isActive ? 'text-echo-blue' : 'text-white/45'}`}
            >
              <Icon className="w-5.5 h-5.5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
