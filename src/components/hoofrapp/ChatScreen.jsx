import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, MoreVertical, ShieldOff } from 'lucide-react'

const QUICK_REPLIES = ['Neigh! 🐴', "You're so cute 🥺", 'Want to graze together? 🌿', 'Your mane is goals ✨']

export default function ChatScreen({ horse, messages, onBack, onSend, onBlock }) {
  const [text, setText] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [showBlockConfirm, setShowBlockConfirm] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = (msg) => {
    if (!msg.trim()) return
    onSend(horse.id, msg.trim())
    setText('')
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-pink-100 shadow-sm">
        <button onClick={onBack} className="text-pink-400 p-1">
          <ArrowLeft size={22} />
        </button>
        <img src={horse.photo} alt={horse.name} className="w-10 h-10 rounded-full object-cover border-2 border-pink-200" />
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-sm">{horse.name}</p>
          <p className="text-xs text-green-400 font-medium">Online 🌿</p>
        </div>
        <button onClick={() => setShowMenu(m => !m)} className="text-gray-400 p-1 relative">
          <MoreVertical size={20} />
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute right-0 top-8 bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden z-10 w-44"
              >
                <button
                  onClick={() => { setShowMenu(false); setShowBlockConfirm(true) }}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 font-medium hover:bg-red-50"
                >
                  <ShieldOff size={15} /> Block from Hay Barn
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <div className="text-center text-xs text-purple-300 mb-4">You matched with {horse.name}! 🎉</div>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.from !== 'me' && (
              <img src={horse.photo} alt="" className="w-7 h-7 rounded-full object-cover mr-2 self-end border border-pink-200" />
            )}
            <div
              className={`max-w-[72%] px-4 py-2 rounded-2xl text-sm font-medium ${
                msg.from === 'me'
                  ? 'bg-gradient-to-br from-pink-400 to-purple-400 text-white rounded-br-sm'
                  : 'bg-white border border-pink-100 text-gray-700 rounded-bl-sm'
              }`}
            >
              {msg.text}
              <p className={`text-xs mt-0.5 ${msg.from === 'me' ? 'text-pink-100' : 'text-gray-400'}`}>{msg.time}</p>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="flex gap-2 px-4 pb-2 overflow-x-auto no-scrollbar">
        {QUICK_REPLIES.map(q => (
          <button
            key={q}
            onClick={() => send(q)}
            className="shrink-0 text-xs bg-pink-100 text-pink-500 font-medium px-3 py-1.5 rounded-full border border-pink-200 active:scale-95"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 pb-4 pt-2 bg-white border-t border-pink-100">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(text)}
          placeholder="Send a neigh... 🐴"
          className="flex-1 bg-pink-50 border border-pink-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-pink-400"
        />
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => send(text)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white shadow-md"
        >
          <Send size={16} />
        </motion.button>
      </div>

      {/* Block confirm */}
      <AnimatePresence>
        {showBlockConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowBlockConfirm(false)} />
            <motion.div
              className="relative bg-white rounded-3xl p-6 text-center shadow-2xl w-full max-w-sm"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="text-4xl mb-3">🚫🌾</div>
              <h3 className="font-black text-gray-800 text-lg mb-1">Block from Hay Barn?</h3>
              <p className="text-sm text-gray-500 mb-5">
                {horse.name} will be sent to the shadow stable. They won't be able to send you any more inappropriate hay photos.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBlockConfirm(false)}
                  className="flex-1 py-3 rounded-full border-2 border-gray-200 text-gray-500 font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { onBlock(horse.id); setShowBlockConfirm(false) }}
                  className="flex-1 py-3 rounded-full bg-red-400 text-white font-bold text-sm shadow-md"
                >
                  Block 🚫
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
