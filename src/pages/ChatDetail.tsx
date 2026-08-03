import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Phone, Video, Paperclip, Camera, Send } from 'lucide-react'

export default function ChatDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, fromMe: false, text: 'Hey! Did you see the new Echo update?', time: '2:14 PM' },
    { id: 2, fromMe: true, text: 'Yes! The glassmorphism is crazy good 🔥', time: '2:15 PM' },
    { id: 3, fromMe: false, text: "Can't wait to ship more features 💜", time: '2:16 PM' },
  ])

  function sendMessage() {
    if (!message.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), fromMe: true, text: message.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ])
    setMessage('')
  }

  return (
    <div className="flex flex-col h-full animate-fade">
      <div className="px-4 pt-2 pb-2.5 flex items-center gap-2.5 border-b border-white/5">
        <button onClick={() => navigate('/chats')} className="text-white/60">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-8 h-8 rounded-full bg-echo-card" />
        <div className="flex-1">
          <p className="font-medium text-sm">Maya</p>
          <p className="text-[10px] text-green-400">Online</p>
        </div>
        <button className="w-8 h-8 rounded-full glass flex items-center justify-center">
          <Phone className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-full glass flex items-center justify-center">
          <Video className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-3 space-y-2.5">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2 ${
                m.fromMe
                  ? 'bg-echo-blue/90 rounded-br-md'
                  : 'glass rounded-bl-md'
              }`}
            >
              <p className="text-sm">{m.text}</p>
              <p className={`text-[10px] mt-0.5 text-right ${m.fromMe ? 'text-white/55' : 'text-white/35'}`}>
                {m.time} {m.fromMe && '✓✓'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-3 py-2.5 border-t border-white/5">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full glass flex items-center justify-center flex-shrink-0">
            <Paperclip className="w-4.5 h-4.5 text-white/60" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Message..."
            className="flex-1 bg-echo-card border border-echo-border rounded-full py-2 px-3.5 text-sm text-white placeholder-white/35 focus:outline-none"
          />
          <button className="w-9 h-9 rounded-full glass flex items-center justify-center flex-shrink-0">
            <Camera className="w-4.5 h-4.5 text-white/60" />
          </button>
          <button
            onClick={sendMessage}
            className="w-9 h-9 rounded-full bg-echo-blue flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(79,140,255,0.4)]"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
