import { motion } from 'framer-motion'
import { Flame, MessageCircle, User } from 'lucide-react'

const tabs = [
  { id: 'discover', icon: Flame, label: 'Discover' },
  { id: 'messages', icon: MessageCircle, label: 'Messages' },
  { id: 'profile', icon: User, label: 'Profile' },
]

export default function BottomNav({ activeTab, onTabChange, messageCount = 2 }) {
  return (
    <div
      className="flex-shrink-0 flex items-center border-t"
      style={{
        background: 'white',
        borderColor: '#f1f5f9',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
        height: 64,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative"
          >
            <div className="relative">
              {isActive ? (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -inset-2 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, #fff1e6, #fce7f3)' }}
                />
              ) : null}
              <tab.icon
                className="w-5 h-5 relative z-10"
                strokeWidth={isActive ? 2.5 : 1.8}
                style={{
                  color: isActive ? '#f97316' : '#9ca3af',
                }}
              />
              {tab.id === 'messages' && messageCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center z-20"
                  style={{ background: '#ec4899' }}
                >
                  {messageCount}
                </span>
              )}
            </div>
            <span
              className="text-[11px] font-medium relative z-10"
              style={{ color: isActive ? '#f97316' : '#9ca3af' }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
