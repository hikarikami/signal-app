import { motion } from 'framer-motion'
import { Heart, MessageCircle, Search, User } from 'lucide-react'

const TABS = [
  { id: 'discover', icon: Heart, label: 'Discover' },
  { id: 'messages', icon: MessageCircle, label: 'Messages' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'profile', icon: User, label: 'Me' },
]

export default function BottomNav({ activeTab, onTabChange, matchCount }) {
  return (
    <nav className="flex items-center bg-white border-t border-pink-100 shadow-lg px-2 pb-safe">
      {TABS.map(({ id, icon: Icon, label }) => {
        const active = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex-1 flex flex-col items-center py-3 gap-0.5 relative"
          >
            <div className="relative">
              <Icon
                size={22}
                className={active ? 'text-pink-500' : 'text-gray-400'}
                fill={active && id === 'discover' ? 'currentColor' : 'none'}
              />
              {id === 'messages' && matchCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {matchCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold ${active ? 'text-pink-500' : 'text-gray-400'}`}>{label}</span>
            {active && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
