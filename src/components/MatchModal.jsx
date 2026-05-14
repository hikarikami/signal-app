import { useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"

export default function MatchModal({ horse, onClose, onKeepSwiping }) {
  const audioRef = useRef(null)

  const confetti = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ["#ff1f6b", "#ffd600", "#00ff88", "#9b4dff", "#ff6b35", "#00cfff"][
          Math.floor(Math.random() * 6)
        ],
        size: 5 + Math.random() * 10,
        delay: Math.random() * 1.5,
        duration: 1.8 + Math.random() * 1.2,
        shape: Math.random() > 0.5 ? "rounded-full" : "rounded-sm",
      })),
    []
  )

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.45
      audio.play().catch(() => {})
    }
    return () => {
      if (audio) audio.pause()
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #2a0540 0%, #0a0812 70%)",
      }}
    >
      <audio ref={audioRef} src="/horse-sound-1.mp3" />

      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute pointer-events-none ${item.shape}`}
          style={{
            left: `${item.x}%`,
            top: -20,
            width: item.size,
            height: item.size,
            backgroundColor: item.color,
          }}
          animate={{ y: "115vh", rotate: [0, 360, 720], opacity: [1, 1, 0] }}
          transition={{
            delay: item.delay,
            duration: item.duration,
            ease: "easeIn",
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 1,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-5 px-8 text-center max-w-sm w-full">
        <motion.div
          animate={{ scale: [1, 1.35, 1], rotate: [0, -12, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-5xl"
        >
          💖
        </motion.div>

        <motion.div
          initial={{ scale: 0.3, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 14 }}
        >
          <h1
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(48px, 14vw, 64px)" }}
          >
            IT'S A<br />
            <span style={{ color: "#ff1f6b", textShadow: "0 0 30px rgba(255,31,107,0.6)" }}>
              MATCH!
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-white/50 text-xs font-bold tracking-widest uppercase"
        >
          YOUR HOOVES WERE MADE FOR EACH OTHER 🐴❤️🐴
        </motion.p>

        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 16 }}
          className="flex items-center gap-4"
        >
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#ff1f6b]"
            style={{ boxShadow: "0 0 25px rgba(255,31,107,0.5)" }}
          >
            <img src="/horse-pics/horse-1.jpg" alt="You" className="w-full h-full object-cover" />
          </div>

          <motion.span
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.9 }}
            className="text-3xl"
          >
            💕
          </motion.span>

          <div
            className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#ff1f6b]"
            style={{ boxShadow: "0 0 25px rgba(255,31,107,0.5)" }}
          >
            <img src={horse.photo} alt={horse.name} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-0.5"
        >
          <p className="text-white font-black text-lg">You & {horse.name}</p>
          <p className="text-white/40 text-xs">both said YAY!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col gap-3 w-full"
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onClose}
            className="w-full py-4 rounded-2xl text-white font-black text-lg tracking-wide"
            style={{
              background: "linear-gradient(135deg, #ff1f6b, #ff6b9d)",
              boxShadow: "0 4px 24px rgba(255,31,107,0.45)",
            }}
          >
            SEND A NEIGH 💌
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onKeepSwiping}
            className="w-full py-3 rounded-2xl bg-white/8 text-white/70 font-bold text-sm border border-white/15"
          >
            Keep Galloping 🏇
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
