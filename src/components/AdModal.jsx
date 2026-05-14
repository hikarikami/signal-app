import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star, ShoppingCart } from "lucide-react"

const PRODUCTS = [
  {
    emoji: "🌾",
    name: "Premium Hay — Gold Flake Edition",
    tagline: "23-carat gold flakes infused into organic timothy hay. Taste the wealth.",
    price: "$49.99",
    unit: "per bale",
    rating: 4.9,
    reviews: "47,203",
    badge: "BESTSELLER",
    badgeColor: "#ffd600",
  },
  {
    emoji: "🛁",
    name: "MudBath Pro Kit™",
    tagline: "Professional-grade mud sourced from actual certified fields. Your coat will thank you.",
    price: "$29.99",
    unit: "per kit",
    rating: 4.7,
    reviews: "12,008",
    badge: "EDITOR'S PICK",
    badgeColor: "#00ff88",
  },
  {
    emoji: "🎤",
    name: "Competitive Neighing Masterclass",
    tagline: "12-week online course. Go from amateur to semi-pro in just 84 days. Certificates issued.",
    price: "$199",
    unit: "lifetime access",
    rating: 4.8,
    reviews: "3,441",
    badge: "HOT RIGHT NOW",
    badgeColor: "#ff6b35",
  },
  {
    emoji: "✨",
    name: "Hoofer Premium+",
    tagline: "Unlimited neighs. See who liked you. Advanced hay filters. Change your life forever.",
    price: "$9.99",
    unit: "per month",
    rating: 4.6,
    reviews: "88,721",
    badge: "MOST POPULAR",
    badgeColor: "#ff1f6b",
  },
  {
    emoji: "💎",
    name: "Duchess Sparklemane Glitter Mane Kit",
    tagline: "Industrial-strength glitter. Personally approved by Duchess Sparklemane. Results guaranteed.",
    price: "$44.99",
    unit: "per kit",
    rating: 5.0,
    reviews: "2,019",
    badge: "ROYALLY ENDORSED",
    badgeColor: "#9b4dff",
  },
  {
    emoji: "🍎",
    name: "Heritage Apple Selection Box",
    tagline: "12 rare heritage apples, hand-picked by horses, for horses. Pairs well with hay.",
    price: "$34.99",
    unit: "per box",
    rating: 4.9,
    reviews: "29,300",
    badge: "SEASONAL",
    badgeColor: "#ff6b35",
  },
  {
    emoji: "⚡",
    name: "Midnight Zoomies Pre-Workout",
    tagline: "Specially formulated for 3am field sprints. Zero side effects (probably). Glitter-free.",
    price: "$24.99",
    unit: "per tub",
    rating: 4.5,
    reviews: "9,812",
    badge: "NEW FORMULA",
    badgeColor: "#00cfff",
  },
  {
    emoji: "📖",
    name: "The Fence Appreciation Handbook",
    tagline: "147 pages entirely dedicated to the beauty of fences. Life-changing. Neigh-required reading.",
    price: "$14.99",
    unit: "digital download",
    rating: 4.3,
    reviews: "731",
    badge: "INTELLECTUAL CHOICE",
    badgeColor: "#9b4dff",
  },
]

const SKIP_LABELS = [
  "No thanks, I prefer being poor",
  "Skip (I hate good deals)",
  "I don't deserve this",
  "No thanks, I eat bad hay",
  "Skip (my loss honestly)",
  "I'll regret this forever",
]

export default function AdModal({ onClose }) {
  const [product] = useState(() => PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)])
  const [skipLabel] = useState(() => SKIP_LABELS[Math.floor(Math.random() * SKIP_LABELS.length)])
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.75)" }}
    >
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 32 }}
        className="w-full max-w-[430px] rounded-t-3xl overflow-hidden"
        style={{ background: "#0f0b1e", borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <span
            className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
          >
            📣 SPONSORED
          </span>

          <AnimatePresence mode="wait">
            {countdown > 0 ? (
              <motion.div
                key="countdown"
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ border: "2px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 900 }}
              >
                {countdown}
              </motion.div>
            ) : (
              <motion.button
                key="close"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.88 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
              >
                <X size={16} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Product card */}
        <div className="px-5 pb-2">
          <div
            className="rounded-2xl p-5"
            style={{ background: "linear-gradient(135deg, #1a1035, #130f24)" }}
          >
            <div className="flex items-start gap-4">
              {/* Emoji icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {product.emoji}
              </div>

              <div className="flex-1 min-w-0">
                {/* Badge */}
                <span
                  className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1.5"
                  style={{ background: `${product.badgeColor}22`, color: product.badgeColor }}
                >
                  {product.badge}
                </span>

                <h3 className="text-white font-black text-base leading-tight">{product.name}</h3>

                {/* Stars */}
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={i < Math.floor(product.rating) ? "text-[#ffd600]" : "text-white/20"}
                        fill={i < Math.floor(product.rating) ? "#ffd600" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-white/40 text-[11px]">
                    {product.rating} ({product.reviews} horses)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-white/55 text-sm leading-snug mt-3">{product.tagline}</p>

            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-white font-black text-2xl">{product.price}</span>
                <span className="text-white/35 text-xs ml-1">{product.unit}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #ff1f6b, #e0185c)",
                  boxShadow: "0 0 16px rgba(255,31,107,0.4)",
                }}
              >
                <ShoppingCart size={15} />
                BUY NOW
              </motion.button>
            </div>
          </div>
        </div>

        {/* Skip button */}
        <div className="px-5 pt-2 pb-6 text-center">
          <button
            onClick={onClose}
            className="text-white/25 text-xs font-medium transition-colors hover:text-white/45"
            style={{ opacity: countdown > 0 ? 0.4 : 1 }}
            disabled={countdown > 0}
          >
            {skipLabel} →
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
