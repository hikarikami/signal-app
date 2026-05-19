import { motion } from 'framer-motion'
import { MessageCircle, Search } from 'lucide-react'
import { fakeConversations } from '../../data/horses'

export default function MessagesTab() {
  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-4 pt-2 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-100">
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">Search messages</span>
        </div>
      </div>

      {/* New matches row */}
      <div className="px-4 pb-4 flex-shrink-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">New Matches</p>
        <div className="flex gap-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {fakeConversations.map((convo) => (
            <motion.div
              key={convo.id}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-offset-2"
                  style={{ ringColor: '#ec4899' }}>
                  <img
                    src={convo.horse.photo}
                    alt={convo.horse.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {convo.unread && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
                )}
              </div>
              <span className="text-xs text-gray-600 font-medium text-center leading-tight" style={{ maxWidth: 64 }}>
                {convo.horse.name.split(' ')[0]}
              </span>
            </motion.div>
          ))}
          {/* Placeholder match */}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <span className="text-2xl">?</span>
            </div>
            <span className="text-xs text-gray-400">You?</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mx-4 mb-2 flex-shrink-0" />

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Messages</p>
        <div className="flex flex-col gap-1">
          {fakeConversations.map((convo, i) => (
            <motion.div
              key={convo.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-3 rounded-2xl active:bg-gray-50 cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={convo.horse.photo}
                    alt={convo.horse.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {convo.unread && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-rose-400 border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <p className={`font-semibold text-sm ${convo.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                    {convo.horse.name}
                  </p>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{convo.time}</span>
                </div>
                <p className={`text-sm truncate mt-0.5 ${convo.unread ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                  {convo.lastMessage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
