import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { X, Heart } from "lucide-react"

const SWIPE_THRESHOLD = 80

function SwipeCard({ horse, isTop, onSwipe, stackIndex }) {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-14, 0, 14])
  const yayOpacity = useTransform(x, [30, 110], [0, 1])
  const neighOpacity = useTransform(x, [-110, -30], [1, 0])

  const triggerSwipe = async (dir) => {
    const target = dir === "yay" ? 650 : -650
    await controls.start({ x: target, opacity: 0, transition: { duration: 0.32, ease: "easeIn" } })
    onSwipe(dir, horse)
  }

  const handleDragEnd = async (_, info) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      await triggerSwipe("yay")
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      await triggerSwipe("neigh")
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 400, damping: 28 } })
    }
  }

  return (
    <motion.div
      className="absolute inset-x-3 top-0"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 10 - stackIndex,
        originX: 0.5,
        originY: 1,
      }}
      animate={isTop ? controls : { scale: 1 - stackIndex * 0.04, y: stackIndex * 14 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      drag={isTop ? "x" : false}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
    >
      <div
        className="relative rounded-[28px] overflow-hidden bg-[#130f24] shadow-2xl"
        style={{ height: "calc(100svh - 272px)", maxHeight: "560px" }}
      >
        <img
          src={horse.photo}
          alt={horse.name}
          className="absolute inset-0 w-full h-full object-cover select-none"
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

        {isTop && (
          <>
            <motion.div
              style={{ opacity: yayOpacity }}
              className="absolute top-8 left-5 z-20"
            >
              <div
                className="border-[3px] border-[#00ff88] rounded-2xl px-4 py-2"
                style={{ transform: "rotate(-14deg)" }}
              >
                <span className="text-[#00ff88] font-black text-3xl tracking-wide drop-shadow-lg">
                  YAY! 💖
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: neighOpacity }}
              className="absolute top-8 right-5 z-20"
            >
              <div
                className="border-[3px] border-[#ff1f6b] rounded-2xl px-4 py-2"
                style={{ transform: "rotate(14deg)" }}
              >
                <span className="text-[#ff1f6b] font-black text-3xl tracking-wide drop-shadow-lg">
                  NEIGH 🚫
                </span>
              </div>
            </motion.div>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <div className="flex items-end justify-between mb-1.5">
            <div>
              <h2 className="text-white font-black text-[22px] leading-tight">{horse.name}</h2>
              <p className="text-white/60 text-sm font-medium mt-0.5">
                {horse.age} yrs · {horse.distance}
              </p>
            </div>
            <div className="text-right shrink-0 ml-2">
              <p className="text-[#ffd600] text-[11px] font-bold uppercase tracking-wide leading-tight">
                {horse.job}
              </p>
            </div>
          </div>

          <p className="text-white/75 text-sm leading-snug line-clamp-2 mb-3">{horse.bio}</p>

          <div className="flex flex-wrap gap-1.5">
            {horse.interests.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="bg-white/10 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium border border-white/15"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isTop && (
        <div className="flex justify-center gap-5 mt-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => triggerSwipe("neigh")}
            className="w-16 h-16 rounded-full bg-[#0f0b1e] border-2 border-[#ff1f6b]/60 flex items-center justify-center shadow-xl"
          >
            <X size={26} className="text-[#ff1f6b]" strokeWidth={2.5} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => triggerSwipe("yay")}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
            style={{ background: "linear-gradient(135deg, #ff1f6b, #ff6b9d)", boxShadow: "0 0 20px rgba(255,31,107,0.4)" }}
          >
            <Heart size={26} className="text-white" strokeWidth={2.5} fill="white" />
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

export default function SwipeScreen({ profiles, onSwipe }) {
  if (profiles.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-5">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
          className="text-7xl"
        >
          🐴
        </motion.div>
        <h2 className="text-white font-black text-2xl">You've seen all the horses!</h2>
        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
          Come back later when more horses trot into the area. They're out there. Just being horses.
        </p>
      </div>
    )
  }

  const visible = profiles.slice(0, 3)

  return (
    <div className="h-full relative pt-2">
      {[...visible].reverse().map((horse, reversedIndex) => {
        const index = visible.length - 1 - reversedIndex
        return (
          <SwipeCard
            key={horse.id}
            horse={horse}
            isTop={index === 0}
            stackIndex={index}
            onSwipe={onSwipe}
          />
        )
      })}
    </div>
  )
}
