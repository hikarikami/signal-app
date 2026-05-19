import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function MessagesTab({ matches, messages, onOpenChat }) {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
        <div className="text-6xl">💌</div>
        <h3 className="text-xl font-bold text-pink-500">No matches yet!</h3>
        <p className="text-purple-400 text-sm">Gallop over to Discover and start neighing 🐴✨</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-xl font-black text-gray-800">Your Neighs 💌</h2>
        <p className="text-xs text-purple-400">Your matched stable-mates</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {matches.map((horse, i) => {
          const thread = messages[horse.id] || []
          const last = thread[thread.length - 1]
          return (
            <motion.button
              key={horse.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onOpenChat(horse)}
              className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-pink-100 active:scale-[0.98]"
            >
              <div className="relative">
                <img
                  src={horse.photo}
                  alt={horse.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-pink-200"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800 text-sm">{horse.name}</span>
                  {last && <span className="text-xs text-gray-400">{last.time}</span>}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {last ? (last.from === 'me' ? `You: ${last.text}` : last.text) : 'Say hi! 🐴'}
                </p>
              </div>
              <MessageCircle size={16} className="text-pink-300 shrink-0" />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
