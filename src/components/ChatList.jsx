import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function ChatList({ matches, chats, onOpenChat }) {
  if (matches.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-4">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="text-6xl"
        >
          💭
        </motion.div>
        <h2 className="text-white font-black text-xl">No matches yet!</h2>
        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
          Get out there and start swiping. The horses aren't going to find themselves.
        </p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-3">
      <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-3 px-1">
        {matches.length} match{matches.length !== 1 ? "es" : ""}
      </p>

      <div className="space-y-2">
        {matches.map((horse, i) => {
          const messages = chats[horse.id] || []
          const lastMsg = messages[messages.length - 1]

          return (
            <motion.button
              key={horse.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenChat(horse.id)}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#130f24] border border-white/5 text-left transition-colors active:bg-[#1a1530]"
            >
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#ff1f6b]/40">
                  <img src={horse.photo} alt={horse.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00ff88] rounded-full border-2 border-[#0a0812]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-white font-bold text-sm">{horse.name}</h3>
                  {lastMsg && (
                    <span className="text-white/25 text-[11px] shrink-0 ml-2">{lastMsg.time}</span>
                  )}
                </div>
                <p className="text-white/45 text-xs truncate">
                  {lastMsg
                    ? lastMsg.from === "me"
                      ? `You: ${lastMsg.text}`
                      : lastMsg.text
                    : "🐴 New match! Say something!"}
                </p>
              </div>

              <ChevronRight size={16} className="text-white/20 shrink-0" />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
