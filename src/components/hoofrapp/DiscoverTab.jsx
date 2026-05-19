import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Star, RotateCcw } from 'lucide-react'
import SwipeCard from './SwipeCard'
import MatchModal from './MatchModal'
import { horses as initialHorses } from '../../data/horses'

export default function DiscoverTab({ onNavigateMessages }) {
  const [deck, setDeck] = useState([...initialHorses])
  const [matched, setMatched] = useState(null)
  const topCardRef = useRef(null)

  const handleSwipeComplete = useCallback((dir) => {
    setDeck((prev) => {
      if (dir === 'like' && prev.length > 0 && Math.random() < 0.4) {
        setMatched(prev[0])
      }
      return prev.slice(1)
    })
  }, [])

  const handleLike = () => topCardRef.current?.swipe('like')
  const handleNope = () => topCardRef.current?.swipe('dislike')

  const handleReset = () => setDeck([...initialHorses])

  return (
    <div className="flex flex-col h-full">
      {/* Card stack area */}
      <div className="flex-1 relative px-4 pt-2 pb-4" style={{ minHeight: 0 }}>
        <AnimatePresence>
          {deck.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-4 flex flex-col items-center justify-center gap-4 rounded-3xl"
              style={{ background: 'linear-gradient(135deg, #fff7ed, #fce7f3)' }}
            >
              <div className="text-6xl">🐴</div>
              <h3 className="text-xl font-bold text-gray-800">You've seen everyone!</h3>
              <p className="text-gray-500 text-sm text-center px-8">
                No more horses in your area. Time to expand your search… or just go to a paddock.
              </p>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
              >
                <RotateCcw className="w-4 h-4" />
                Start over
              </button>
            </motion.div>
          ) : (
            <>
              {/* Behind card */}
              {deck.length > 1 && (
                <div
                  key={`behind-${deck[1]?.id}`}
                  style={{ position: 'absolute', inset: '0.5rem 1rem' }}
                >
                  <SwipeCard
                    horse={deck[1]}
                    isTop={false}
                    stackIndex={1}
                  />
                </div>
              )}

              {/* Top card */}
              <div
                key={`top-${deck[0]?.id}`}
                style={{ position: 'absolute', inset: '0.5rem 1rem' }}
              >
                <SwipeCard
                  ref={topCardRef}
                  horse={deck[0]}
                  isTop={true}
                  stackIndex={0}
                  onSwipeComplete={handleSwipeComplete}
                />
              </div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-5 pb-4 px-6 flex-shrink-0">
        <button
          onClick={handleNope}
          disabled={deck.length === 0}
          className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg active:scale-95 transition-transform disabled:opacity-40"
          style={{ background: 'white', border: '2px solid #fca5a5' }}
        >
          <X className="w-7 h-7 text-rose-400" strokeWidth={2.5} />
        </button>

        <button
          onClick={handleLike}
          disabled={deck.length === 0}
          className="flex items-center justify-center w-20 h-20 rounded-full shadow-xl active:scale-95 transition-transform disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
        >
          <Heart className="w-9 h-9 text-white fill-white" />
        </button>

        <button
          onClick={handleNope}
          disabled={deck.length === 0}
          className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg active:scale-95 transition-transform disabled:opacity-40"
          style={{ background: 'white', border: '2px solid #6ee7b7' }}
        >
          <Star className="w-6 h-6 text-emerald-400" strokeWidth={2} />
        </button>
      </div>

      <MatchModal
        matched={matched}
        onClose={() => setMatched(null)}
        onMessage={() => {
          setMatched(null)
          onNavigateMessages?.()
        }}
      />
    </div>
  )
}
