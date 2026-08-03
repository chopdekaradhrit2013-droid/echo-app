import { useNavigate } from 'react-router-dom'
import { Phone, Video } from 'lucide-react'

export default function Chats() {
  const navigate = useNavigate()

  const conversations = [
    { id: '1', name: 'Maya', last: 'Hey! Did you see the new update?', time: '2m', unread: 2, online: true },
    { id: '2', name: 'Arjun', last: 'Voice message', time: '1h', unread: 0, online: false },
    { id: '3', name: 'Priya', last: 'Thanks for the collab idea!', time: '3h', unread: 0, online: true },
    { id: '4', name: 'Dev', last: "Let's hop on a call tomorrow", time: 'Yesterday', unread: 0, online: false },
  ]

  return (
    <div className="flex flex-col h-full pb-20 animate-fade">
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Chats</h1>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full glass flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full glass flex items-center justify-center">
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-2">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full bg-echo-card border border-echo-border rounded-2xl py-2 px-4 text-sm text-white placeholder-white/35 focus:outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-2">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/chats/${c.id}`)}
            className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/5 text-left"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-echo-card" />
              {c.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-echo-bg" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-sm">{c.name}</span>
                <span className="text-[10px] text-white/35">{c.time}</span>
              </div>
              <p className="text-xs text-white/45 truncate">{c.last}</p>
            </div>
            {c.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-echo-blue flex items-center justify-center text-[10px] font-bold">
                {c.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
