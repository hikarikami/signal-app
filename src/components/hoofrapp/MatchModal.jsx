import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'

export default function MatchModal({ matched, onClose, onMessage }) {
  return (
    <AnimatePresence>
      {matched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="flex flex-col items-center gap-6 px-8 py-10 mx-6 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, #ff6b9d 0%, #c44dff 50%, #ff6b6b 100%)',
              maxWidth: 360,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sparkle burst */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 350, damping: 20 }}
              className="text-6xl"
            >
              🎠
            </motion.div>

            <div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-white font-black text-3xl tracking-tight"
              >
                It&apos;s a Match!
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/85 text-base mt-2"
              >
                You and <strong>{matched.name}</strong> liked each other!
              </motion.p>
            </div>

            {/* Photos */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-3"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={matched.photo} alt={matched.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-white text-3xl font-black">❤️</div>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={matched.photo} alt="you" className="w-full h-full object-cover scale-x-[-1]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3 w-full"
            >
              <button
                onClick={onMessage}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-base"
                style={{ background: 'white', color: '#c44dff' }}
              >
                <MessageCircle className="w-5 h-5" />
                Send a neigh
              </button>
              <button
                onClick={onClose}
                className="text-white/80 text-sm font-medium py-1"
              >
                Keep swiping
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
