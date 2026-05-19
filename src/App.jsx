import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Crown } from 'lucide-react'
import { ALL_HORSES, INITIAL_MESSAGES } from '@/data/horses'
import BubbleBackground from '@/components/hoofrapp/BubbleBackground'
import BottomNav from '@/components/hoofrapp/BottomNav'
import DiscoverTab from '@/components/hoofrapp/DiscoverTab'
import MessagesTab from '@/components/hoofrapp/MessagesTab'
import SearchTab from '@/components/hoofrapp/SearchTab'
import ProfileTab from '@/components/hoofrapp/ProfileTab'
import ChatScreen from '@/components/hoofrapp/ChatScreen'
import MatchModal from '@/components/hoofrapp/MatchModal'
import PremiumModal from '@/components/hoofrapp/PremiumModal'

// subscription: 'none' | 'trial' | 'active'
function App() {
  const [tab, setTab] = useState('discover')
  const [matches, setMatches] = useState([ALL_HORSES[0], ALL_HORSES[5]])
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [blockedIds, setBlockedIds] = useState([])
  const [pendingMatch, setPendingMatch] = useState(null)
  const [chatHorse, setChatHorse] = useState(null)
  const [subscription, setSubscription] = useState('none') // 'none' | 'trial' | 'active'
  const [trialUsed, setTrialUsed] = useState(false)
  const [showPremium, setShowPremium] = useState(false)

  const hasPremium = subscription === 'trial' || subscription === 'active'

  const handleLike = (horse) => {
    if (matches.find(m => m.id === horse.id)) return
    if (Math.random() > 0.4) {
      setMatches(prev => [...prev, horse])
      setPendingMatch(horse)
    }
  }

  const handlePass = () => {}

  const handleMatchClose = () => setPendingMatch(null)

  const handleMatchMessage = () => {
    setPendingMatch(null)
    setChatHorse(pendingMatch)
    setTab('messages')
  }

  const handleSendMessage = (horseId, text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMsg = { id: Date.now(), from: 'me', text, time }
    setMessages(prev => ({ ...prev, [horseId]: [...(prev[horseId] || []), newMsg] }))
    setTimeout(() => {
      const replies = [
        "Omg yesss!! 🐴💕",
        "You are literally the cutest horse",
        "I was just thinking about you!!",
        "Want to graze together sometime? 🌿",
        "NEIGH!! (that means yes) ✨",
        "My hooves are literally shaking rn 🥺",
      ]
      const reply = {
        id: Date.now() + 1,
        from: 'them',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => ({ ...prev, [horseId]: [...(prev[horseId] || []), reply] }))
    }, 1500)
  }

  const handleBlock = (horseId) => {
    setBlockedIds(prev => [...prev, horseId])
    setMatches(prev => prev.filter(m => m.id !== horseId))
    setMessages(prev => { const n = { ...prev }; delete n[horseId]; return n })
    setChatHorse(null)
  }

  const handleViewProfile = (horse) => {
    if (matches.find(m => m.id === horse.id)) {
      setChatHorse(horse)
      setTab('messages')
    }
  }

  const handleStartTrial = () => {
    setSubscription('trial')
    setTrialUsed(true)
    setShowPremium(false)
  }

  const handleSubscribe = () => {
    setSubscription('active')
    setTrialUsed(true)
    setShowPremium(false)
  }

  const activeMatches = matches.filter(m => !blockedIds.includes(m.id))

  return (
    <div className="min-h-svh bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center">
      <BubbleBackground />

      {/* Phone shell */}
      <div className="relative w-full max-w-[430px] h-svh sm:h-[780px] sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden flex flex-col bg-gradient-to-b from-pink-50/80 to-purple-50/80 backdrop-blur-sm sm:border-2 sm:border-pink-200">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-white/80 backdrop-blur-sm border-b border-pink-100">
          <div className="text-xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent tracking-tight">
            HoofR 🐴
          </div>
          <div className="flex items-center gap-2">
            {hasPremium ? (
              <span className="flex items-center gap-1 text-xs bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold px-3 py-1 rounded-full">
                <Crown size={11} />
                {subscription === 'trial' ? 'Free Trial' : 'Premium'}
              </span>
            ) : (
              <button
                onClick={() => setShowPremium(true)}
                className="flex items-center gap-1 text-xs bg-gradient-to-r from-yellow-100 to-pink-100 text-yellow-600 font-bold px-3 py-1 rounded-full border border-yellow-200"
              >
                <Crown size={11} /> Get Premium
              </button>
            )}
            <span className="text-xs text-pink-400 font-medium">🌸</span>
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {chatHorse ? (
              <motion.div
                key="chat"
                className="absolute inset-0"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <ChatScreen
                  horse={chatHorse}
                  messages={messages[chatHorse.id] || []}
                  onBack={() => setChatHorse(null)}
                  onSend={handleSendMessage}
                  onBlock={handleBlock}
                />
              </motion.div>
            ) : (
              <motion.div
                key={tab}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {tab === 'discover' && (
                  <DiscoverTab
                    horses={ALL_HORSES}
                    onLike={handleLike}
                    onPass={handlePass}
                    blockedIds={blockedIds}
                    hasPremium={hasPremium}
                    onShowPaywall={() => setShowPremium(true)}
                  />
                )}
                {tab === 'messages' && (
                  <MessagesTab
                    matches={activeMatches}
                    messages={messages}
                    onOpenChat={setChatHorse}
                  />
                )}
                {tab === 'search' && (
                  <SearchTab
                    onViewProfile={handleViewProfile}
                    blockedIds={blockedIds}
                    hasPremium={hasPremium}
                    onShowPaywall={() => setShowPremium(true)}
                  />
                )}
                {tab === 'profile' && (
                  <ProfileTab
                    blockedCount={blockedIds.length}
                    subscription={subscription}
                    onShowPremium={() => setShowPremium(true)}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!chatHorse && (
          <BottomNav
            activeTab={tab}
            onTabChange={setTab}
            matchCount={activeMatches.length}
          />
        )}
      </div>

      <MatchModal
        match={pendingMatch}
        onClose={handleMatchClose}
        onMessage={handleMatchMessage}
      />

      <PremiumModal
        open={showPremium}
        onClose={() => setShowPremium(false)}
        onSubscribe={handleSubscribe}
        onTrial={handleStartTrial}
        trialUsed={trialUsed}
      />
    </div>
  )
}

export default App
