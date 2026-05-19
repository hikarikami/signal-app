import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import horseSound from '@/assets/horse-sound-1.mp3'

const CONFETTI = ['🌸', '✨', '💕', '🐴', '🌟', '💖', '🎀', '🌈']

export default function MatchModal({ match, onClose, onMessage }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (match) {
      audioRef.current = new Audio(horseSound)
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(() => {})
    }
  }, [match])

  return (
    <AnimatePresence>
      {match && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-pink-500/70 backdrop-blur-sm" onClick={onClose} />

          {/* Confetti */}
          {CONFETTI.map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl pointer-events-none"
              initial={{ y: -20, x: (i - 4) * 60, opacity: 0, scale: 0 }}
              animate={{
                y: [0, Math.random() * 300 + 100],
                x: [(i - 4) * 60, (i - 4) * 60 + (Math.random() - 0.5) * 100],
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0.5],
                rotate: [0, Math.random() * 360],
              }}
              transition={{ duration: 2.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              {emoji}
            </motion.div>
          ))}

          <motion.div
            className="relative z-10 mx-4 rounded-3xl bg-white p-8 text-center shadow-2xl"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="mb-2 text-5xl"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              🐴💕🐴
            </motion.div>

            <h2 className="mb-1 text-3xl font-black text-pink-500">It's a Match!</h2>
            <p className="mb-4 text-sm text-purple-400 font-medium">
              You and {match.name} both neighed yes! 🌸
            </p>

            <div className="mb-6 flex items-center justify-center gap-4">
              <img
                src={match.photo}
                alt={match.name}
                className="h-20 w-20 rounded-full border-4 border-pink-300 object-cover"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={onMessage}
                className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-3 font-bold text-white shadow-lg active:scale-95"
              >
                Send a Neigh 💌
              </button>
              <button
                onClick={onClose}
                className="rounded-full border-2 border-pink-200 px-6 py-2 text-sm font-medium text-pink-400 active:scale-95"
              >
                Keep Clip-Clopping
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
