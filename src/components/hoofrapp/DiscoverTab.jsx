import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Heart, X, Star } from 'lucide-react'

export default function DiscoverTab({ horses, onLike, onPass, blockedIds }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [exitDir, setExitDir] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-20, 20])
  const likeOpacity = useTransform(x, [30, 100], [0, 1])
  const passOpacity = useTransform(x, [-100, -30], [1, 0])

  const visible = horses.filter(h => !blockedIds.includes(h.id))
  const horse = visible[currentIndex % visible.length]

  if (!horse) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
        <div className="text-6xl">🐴</div>
        <h3 className="text-xl font-bold text-pink-500">You've seen every horse!</h3>
        <p className="text-purple-400 text-sm">Come back later for fresh neighs ✨</p>
      </div>
    )
  }

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      swipe('right')
    } else if (info.offset.x < -100) {
      swipe('left')
    } else {
      x.set(0)
    }
  }

  const swipe = (dir) => {
    setExitDir(dir)
    setShowDetail(false)
    setTimeout(() => {
      if (dir === 'right') onLike(horse)
      else onPass(horse)
      setCurrentIndex(i => i + 1)
      setExitDir(null)
      x.set(0)
    }, 300)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 flex items-center justify-center px-4 pt-4">

        {/* Peek card behind */}
        {visible[currentIndex + 1] && (
          <div className="absolute inset-x-6 top-8 bottom-20 rounded-3xl bg-white/60 border-2 border-pink-100 scale-95 shadow-md" />
        )}

        <AnimatePresence>
          {!exitDir && (
            <motion.div
              key={horse.id}
              className="absolute inset-x-4 top-4 bottom-20 rounded-3xl bg-white border-2 border-pink-200 shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ x, rotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ x: exitDir === 'right' ? 400 : -400, opacity: 0, transition: { duration: 0.3 } }}
            >
              {/* Like / Pass overlays */}
              <motion.div
                className="absolute top-6 left-6 z-10 rounded-2xl bg-green-400 px-4 py-2 font-black text-white text-xl border-4 border-white rotate-[-15deg]"
                style={{ opacity: likeOpacity }}
              >
                NEIGH! 🐴
              </motion.div>
              <motion.div
                className="absolute top-6 right-6 z-10 rounded-2xl bg-red-400 px-4 py-2 font-black text-white text-xl border-4 border-white rotate-[15deg]"
                style={{ opacity: passOpacity }}
              >
                NOPE 💨
              </motion.div>

              <img
                src={horse.photo}
                alt={horse.name}
                className="w-full h-2/3 object-cover pointer-events-none"
              />

              <div className="p-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <h2 className="text-xl font-black text-gray-800">{horse.name}</h2>
                  <span className="text-gray-500 font-medium">{horse.age}</span>
                  <span className="ml-auto text-xs bg-pink-100 text-pink-500 font-bold px-2 py-0.5 rounded-full">{horse.breed}</span>
                </div>
                <p className="text-xs text-purple-400 mb-2">📍 {horse.location}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {horse.personality.map(p => (
                    <span key={p} className="text-xs bg-purple-100 text-purple-500 px-2 py-0.5 rounded-full font-medium">{p}</span>
                  ))}
                </div>
                <button
                  onClick={() => setShowDetail(true)}
                  className="text-xs text-pink-400 font-semibold underline"
                >
                  See full profile ✨
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-6">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => swipe('left')}
            className="w-14 h-14 rounded-full bg-white border-2 border-red-200 flex items-center justify-center shadow-lg text-red-400"
          >
            <X size={26} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => swipe('right')}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-xl text-white"
          >
            <Heart size={28} fill="white" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="w-14 h-14 rounded-full bg-white border-2 border-yellow-200 flex items-center justify-center shadow-lg text-yellow-400"
          >
            <Star size={22} />
          </motion.button>
        </div>
      </div>

      {/* Profile detail sheet */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowDetail(false)} />
            <motion.div
              className="relative w-full max-w-[430px] mx-auto bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <img src={horse.photo} alt={horse.name} className="w-full h-52 object-cover rounded-2xl mb-4" />
              <h2 className="text-2xl font-black text-gray-800 mb-1">{horse.name}, {horse.age}</h2>
              <p className="text-sm text-purple-400 mb-1">🐴 {horse.breed} · 📍 {horse.location}</p>
              <p className="text-sm text-gray-600 mb-4">{horse.lifestyle}</p>

              <h3 className="font-bold text-pink-500 mb-2">Loves 💕</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {horse.likes.map(l => (
                  <span key={l} className="text-xs bg-pink-50 border border-pink-200 text-pink-500 px-3 py-1 rounded-full">{l}</span>
                ))}
              </div>

              <h3 className="font-bold text-purple-400 mb-2">Nopes 🙅‍♀️</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {horse.dislikes.map(d => (
                  <span key={d} className="text-xs bg-purple-50 border border-purple-200 text-purple-400 px-3 py-1 rounded-full">{d}</span>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => { swipe('left'); setShowDetail(false) }} className="flex-1 py-3 rounded-full border-2 border-red-200 text-red-400 font-bold">Pass 💨</button>
                <button onClick={() => { swipe('right'); setShowDetail(false) }} className="flex-1 py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg">Neigh! 🐴</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
