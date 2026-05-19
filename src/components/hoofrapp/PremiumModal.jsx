import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Star, Sparkles, X } from 'lucide-react'

const PERKS = [
  { icon: '🐴', label: 'Access Thoroughbred profiles' },
  { icon: '⭐', label: 'Unlimited super likes' },
  { icon: '👀', label: 'See who viewed your profile' },
  { icon: '🌟', label: 'Priority in the hay feed' },
]

export default function PremiumModal({ open, onClose, onSubscribe, onTrial, trialUsed }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-[430px] bg-white rounded-t-3xl overflow-hidden pb-8"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
          >
            {/* Gradient banner */}
            <div className="bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 px-6 pt-8 pb-10 text-center text-white relative">
              <button onClick={onClose} className="absolute top-4 right-4 opacity-70">
                <X size={20} />
              </button>
              <motion.div
                animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-5xl mb-2"
              >
                👑
              </motion.div>
              <h2 className="text-2xl font-black mb-1">HoofR Premium</h2>
              <p className="text-sm opacity-90">Gallop past the gate — unlock Thoroughbreds and more ✨</p>
            </div>

            {/* Perks */}
            <div className="px-6 -mt-5">
              <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-4 space-y-3 mb-5">
                {PERKS.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-xl w-8">{icon}</span>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="ml-auto text-green-400 text-lg">✓</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="text-center mb-4">
                <span className="text-3xl font-black text-gray-800">$9.99</span>
                <span className="text-gray-400 text-sm"> / month</span>
                <p className="text-xs text-gray-400 mt-1">Cancel anytime · No hidden fees</p>
              </div>

              <div className="space-y-3">
                {!trialUsed && (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={onTrial}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-black text-base shadow-lg"
                  >
                    Start 7-Day Free Trial 🌟
                  </motion.button>
                )}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onSubscribe}
                  className={`w-full py-3.5 rounded-full font-bold text-base ${
                    trialUsed
                      ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                      : 'border-2 border-pink-300 text-pink-500'
                  }`}
                >
                  Subscribe — $9.99/mo 👑
                </motion.button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-3">
                {trialUsed ? 'Free trial already used on this account' : 'No payment needed during free trial'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
