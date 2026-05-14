import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, MoreVertical, Send } from "lucide-react"

export default function ChatScreen({ horse, messages, onSend, onBack, onUnmatch }) {
  const [text, setText] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [showUnmatchConfirm, setShowUnmatchConfirm] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText("")
  }

  if (!horse) return null

  return (
    <div className="h-full flex flex-col bg-[#0a0812]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 shrink-0 bg-[#0f0b1e]">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#ff1f6b]/40 shrink-0">
          <img src={horse.photo} alt={horse.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-sm leading-none">{horse.name}</h3>
          <p className="text-[#00ff88] text-[11px] mt-0.5 font-medium">
            online · probably eating hay
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-xl text-white/35 hover:text-white transition-colors"
          >
            <MoreVertical size={20} />
          </button>

          <AnimatePresence>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-10 z-50 bg-[#1c1535] border border-white/10 rounded-2xl shadow-2xl overflow-hidden min-w-[160px]"
                >
                  <button
                    onClick={() => {
                      setShowMenu(false)
                      setShowUnmatchConfirm(true)
                    }}
                    className="px-4 py-3.5 text-[#ff1f6b] text-sm font-bold w-full text-left hover:bg-white/5 transition-colors"
                  >
                    💔 Unmatch
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <div className="text-4xl mb-3">🐴</div>
            <p className="text-white/35 text-sm font-medium">You matched with {horse.name}!</p>
            <p className="text-white/25 text-xs mt-1">Ask about their hay preferences. It works.</p>
          </div>
        )}

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[76%] px-4 py-2.5 rounded-2xl text-sm font-medium leading-snug ${
                msg.from === "me"
                  ? "text-white rounded-br-md"
                  : "bg-[#1a1530] text-white rounded-bl-md border border-white/8"
              }`}
              style={
                msg.from === "me"
                  ? {
                      background: "linear-gradient(135deg, #ff1f6b, #e0185c)",
                    }
                  : {}
              }
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 border-t border-white/8 bg-[#0f0b1e] shrink-0">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type something horsey..."
            className="flex-1 bg-[#1a1530] text-white placeholder-white/25 rounded-2xl px-4 py-3 text-sm border border-white/8 focus:outline-none focus:border-[#ff1f6b]/40 transition-colors"
          />
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-11 h-11 rounded-2xl flex items-center justify-center disabled:opacity-30 transition-all"
            style={{
              background: text.trim()
                ? "linear-gradient(135deg, #ff1f6b, #e0185c)"
                : "#1a1530",
              boxShadow: text.trim() ? "0 0 16px rgba(255,31,107,0.35)" : "none",
            }}
          >
            <Send size={17} className="text-white" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showUnmatchConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setShowUnmatchConfirm(false)}
          >
            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1c1535] rounded-t-3xl w-full max-w-[430px] p-6 border-t border-white/10"
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">💔</div>
                <h3 className="text-white font-black text-xl">Unmatch {horse.name}?</h3>
                <p className="text-white/45 text-sm mt-2">
                  They will be sent back to the field. This cannot be undone.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={onUnmatch}
                  className="w-full py-4 rounded-2xl bg-[#ff1f6b] text-white font-black text-base"
                >
                  Yes, unmatch
                </button>
                <button
                  onClick={() => setShowUnmatchConfirm(false)}
                  className="w-full py-3 rounded-2xl bg-white/8 text-white/60 font-bold text-sm border border-white/10"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
