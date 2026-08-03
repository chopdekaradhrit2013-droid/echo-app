import { Heart, MessageCircle, UserPlus } from 'lucide-react'

export default function Notifications() {
  const items = [
    { type: 'like', text: '@maya_ and 24 others liked your post', time: '2 minutes ago', icon: Heart, color: 'text-echo-blue' },
    { type: 'comment', text: '@arjun commented: “This is fire 🔥”', time: '15 minutes ago', icon: MessageCircle, color: 'text-purple-400' },
    { type: 'follow', text: '@priya started following you', time: '1 hour ago', icon: UserPlus, color: 'text-green-400' },
  ]

  return (
    <div className="flex flex-col h-full pb-20 animate-fade">
      <div className="px-4 pt-3 pb-3">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 space-y-2.5 pb-4">
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="glass rounded-2xl p-3.5 flex items-start gap-3">
              <div className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{item.text}</p>
                <p className="text-xs text-white/35 mt-0.5">{item.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
