export default function Discover() {
  return (
    <div className="flex flex-col h-full pb-20 animate-fade">
      <div className="px-4 pt-3 pb-2">
        <input
          type="text"
          placeholder="Search Echo..."
          className="w-full bg-echo-card border border-echo-border rounded-2xl py-2.5 px-4 text-sm text-white placeholder-white/35 focus:outline-none focus:border-echo-blue/40"
        />
        <div className="flex gap-2 mt-2.5 overflow-x-auto hide-scrollbar">
          {['For You', 'Trending', 'Music', 'Art', 'Tech'].map((cat, i) => (
            <button
              key={cat}
              className={`px-3.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                i === 0 ? 'bg-echo-blue text-white' : 'glass text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-4">
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`rounded-2xl bg-echo-card overflow-hidden relative ${
                i === 3 ? 'col-span-2 aspect-[2/1]' : 'aspect-[3/4]'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-echo-blue/20 to-echo-purple/20" />
              <div className="absolute bottom-2.5 left-2.5">
                <p className="text-xs font-medium">@creator{i}</p>
                <p className="text-[10px] text-white/50">{(i * 42)}K views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
