import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DiscoverTab from './components/hoofrapp/DiscoverTab'
import MessagesTab from './components/hoofrapp/MessagesTab'
import ProfileTab from './components/hoofrapp/ProfileTab'
import BottomNav from './components/hoofrapp/BottomNav'

const tabVariants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function App() {
  const [activeTab, setActiveTab] = useState('discover')

  return (
    <div
      className="flex items-center justify-center min-h-svh"
      style={{ background: '#f8f4f0' }}
    >
      {/* Phone shell */}
      <div
        className="relative flex flex-col overflow-hidden shadow-2xl"
        style={{
          width: '100%',
          maxWidth: 430,
          height: '100svh',
          maxHeight: 900,
          background: '#fafafa',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 flex-shrink-0"
          style={{
            paddingTop: 'max(env(safe-area-inset-top, 0px), 14px)',
            paddingBottom: 10,
            background: 'white',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-2xl">🐴</span>
            <h1 className="font-black text-xl tracking-tight"
              style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              HoofR
            </h1>
          </div>

          {activeTab === 'discover' && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: 'linear-gradient(135deg, #fff1e6, #fce7f3)' }}
            >
              <span className="text-xs font-semibold"
                style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                Near you
              </span>
              <span className="text-xs">📍</span>
            </div>
          )}

          {activeTab === 'messages' && (
            <span className="font-bold text-gray-800">Messages</span>
          )}

          {activeTab === 'profile' && (
            <span className="font-bold text-gray-800">My Profile</span>
          )}
        </div>

        {/* Tab content */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {activeTab === 'discover' && (
                <DiscoverTab onNavigateMessages={() => setActiveTab('messages')} />
              )}
              {activeTab === 'messages' && <MessagesTab />}
              {activeTab === 'profile' && <ProfileTab />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          messageCount={2}
        />
      </div>
    </div>
  )
}

export default App
