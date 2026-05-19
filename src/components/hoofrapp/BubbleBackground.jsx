import { motion } from 'framer-motion'

const BUBBLES = [
  { size: 60, x: '8%', delay: 0, color: 'bg-pink-200/40' },
  { size: 40, x: '75%', delay: 1.2, color: 'bg-purple-200/40' },
  { size: 80, x: '55%', delay: 0.6, color: 'bg-yellow-200/30' },
  { size: 30, x: '20%', delay: 2, color: 'bg-blue-200/40' },
  { size: 50, x: '88%', delay: 1.8, color: 'bg-pink-300/30' },
  { size: 35, x: '40%', delay: 0.3, color: 'bg-green-200/30' },
]

export default function BubbleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {BUBBLES.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${b.color} backdrop-blur-sm`}
          style={{ width: b.size, height: b.size, left: b.x, bottom: -b.size }}
          animate={{ y: [0, -(window.innerHeight + b.size * 2)] }}
          transition={{ duration: 8 + i * 1.5, delay: b.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}
