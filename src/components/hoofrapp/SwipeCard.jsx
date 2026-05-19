import { forwardRef, useImperativeHandle } from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'

const SwipeCard = forwardRef(({ horse, isTop, stackIndex = 0, onSwipeComplete }, ref) => {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-250, 250], [-18, 18])

  const likeOpacity = useTransform(x, [30, 120], [0, 1])
  const nopeOpacity = useTransform(x, [-120, -30], [1, 0])

  useImperativeHandle(ref, () => ({
    swipe: async (dir) => {
      const xVal = dir === 'like' ? 700 : -700
      const rotVal = dir === 'like' ? 20 : -20
      await controls.start({
        x: xVal,
        opacity: 0,
        rotate: rotVal,
        transition: { duration: 0.35, ease: 'easeOut' },
      })
      onSwipeComplete?.(dir)
    },
  }))

  const handleDragEnd = async (_, info) => {
    const swipeX = info.offset.x
    const velX = info.velocity.x

    if (swipeX > 100 || velX > 500) {
      await controls.start({
        x: 700,
        opacity: 0,
        rotate: 20,
        transition: { duration: 0.3, ease: 'easeOut' },
      })
      onSwipeComplete?.('like')
    } else if (swipeX < -100 || velX < -500) {
      await controls.start({
        x: -700,
        opacity: 0,
        rotate: -20,
        transition: { duration: 0.3, ease: 'easeOut' },
      })
      onSwipeComplete?.('dislike')
    } else {
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: 'spring', stiffness: 500, damping: 35 },
      })
    }
  }

  const behindScale = 1 - stackIndex * 0.04
  const behindY = stackIndex * 10

  return (
    <motion.div
      animate={controls}
      drag={isTop ? true : false}
      dragElastic={0.15}
      onDragEnd={isTop ? handleDragEnd : undefined}
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : 0,
        rotate: isTop ? rotate : 0,
        scale: isTop ? 1 : behindScale,
        translateY: isTop ? 0 : behindY,
        position: 'absolute',
        inset: 0,
        touchAction: 'none',
        cursor: isTop ? 'grab' : 'default',
        zIndex: isTop ? 10 : 5,
      }}
      whileDrag={{ cursor: 'grabbing' }}
    >
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white select-none">
        {/* Photo */}
        <div className="relative" style={{ height: '68%' }}>
          <img
            src={horse.photo}
            alt={horse.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Gradient overlay at bottom of photo */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '50%',
              background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.55))',
            }}
          />

          {/* LIKE stamp */}
          {isTop && (
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-6 left-6 border-4 border-green-400 rounded-xl px-4 py-2 rotate-[-12deg]"
            >
              <span className="text-green-400 font-black text-2xl tracking-widest">LIKE</span>
            </motion.div>
          )}

          {/* NOPE stamp */}
          {isTop && (
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-6 right-6 border-4 border-rose-400 rounded-xl px-4 py-2 rotate-[12deg]"
            >
              <span className="text-rose-400 font-black text-2xl tracking-widest">NOPE</span>
            </motion.div>
          )}

          {/* Name on photo */}
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-end gap-2">
              <h2 className="text-white font-bold text-2xl leading-none drop-shadow-lg">
                {horse.name}
              </h2>
              <span className="text-white/90 font-semibold text-lg leading-none drop-shadow-lg">
                {horse.age}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-white/80" />
              <span className="text-white/80 text-xs font-medium">{horse.distance}</span>
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="p-4 flex flex-col gap-2" style={{ height: '32%' }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
              {horse.breed}
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-snug line-clamp-2">{horse.bio}</p>
          <div className="flex gap-1.5 flex-wrap mt-auto">
            {horse.interests.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
})

SwipeCard.displayName = 'SwipeCard'

export default SwipeCard
