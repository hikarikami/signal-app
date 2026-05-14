import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Heart, User } from "lucide-react"
import {
  HORSE_PROFILES,
  MY_PROFILE,
  INITIAL_MATCHES,
  INITIAL_CHATS,
  AUTO_REPLIES,
} from "@/data/horses"
import SwipeScreen from "@/components/SwipeScreen"
import MatchModal from "@/components/MatchModal"
import AdModal from "@/components/AdModal"
import ChatList from "@/components/ChatList"
import ChatScreen from "@/components/ChatScreen"
import ProfileScreen from "@/components/ProfileScreen"

export default function App() {
  const [screen, setScreen] = useState("discover")
  const [profiles, setProfiles] = useState(HORSE_PROFILES.slice(2))
  const [matches, setMatches] = useState(INITIAL_MATCHES)
  const [chats, setChats] = useState(INITIAL_CHATS)
  const [showMatch, setShowMatch] = useState(false)
  const [lastMatch, setLastMatch] = useState(null)
  const [activeChat, setActiveChat] = useState(null)
  const [showAd, setShowAd] = useState(false)
  const [swipeCount, setSwipeCount] = useState(0)
  const [adThreshold, setAdThreshold] = useState(() => 2 + Math.round(Math.random())) // 2 or 3

  const handleSwipe = (direction, horse) => {
    if (direction === "yay" && horse.likesYou) {
      setLastMatch(horse)
      setShowMatch(true)
      setMatches((prev) => [...prev, horse])
      setChats((prev) => ({ ...prev, [horse.id]: [] }))
    }
    setProfiles((prev) => prev.filter((p) => p.id !== horse.id))

    setSwipeCount((prev) => {
      const next = prev + 1
      if (next >= adThreshold) {
        setShowAd(true)
        setAdThreshold(2 + Math.round(Math.random()))
        return 0
      }
      return next
    })
  }

  const handleSendMessage = (horseId, text) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setChats((prev) => ({
      ...prev,
      [horseId]: [...(prev[horseId] || []), { id: Date.now(), text, from: "me", time }],
    }))

    setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setChats((prev) => ({
        ...prev,
        [horseId]: [
          ...(prev[horseId] || []),
          { id: Date.now() + 1, text: reply, from: "them", time: replyTime },
        ],
      }))
    }, 1000 + Math.random() * 1200)
  }

  const handleUnmatch = (horseId) => {
    setMatches((prev) => prev.filter((m) => m.id !== horseId))
    setChats((prev) => {
      const next = { ...prev }
      delete next[horseId]
      return next
    })
    setActiveChat(null)
    setScreen("matches")
  }

  const handleMatchClose = () => {
    setShowMatch(false)
    setActiveChat(lastMatch.id)
    setScreen("matches")
  }

  const tabs = [
    { id: "discover", label: "DISCOVER", icon: Zap },
    { id: "matches", label: "NEIGHS", icon: Heart },
    { id: "profile", label: "MY STABLE", icon: User },
  ]

  const chatScreen = screen === "matches" && activeChat

  return (
    <div className="min-h-svh flex items-center justify-center" style={{ background: "#050308" }}>
      <div
        className="relative w-full flex flex-col overflow-hidden"
        style={{
          maxWidth: 430,
          height: "100svh",
          background: "#0a0812",
        }}
      >
        {/* Header */}
        <AnimatePresence mode="wait">
          {!chatScreen && (
            <motion.header
              key="header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐴</span>
                <span
                  className="font-black tracking-tight"
                  style={{ fontSize: 26, color: "#fff" }}
                >
                  HOO
                  <span style={{ color: "#ff1f6b" }}>FER</span>
                </span>
              </div>
              <div
                className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {screen === "discover"
                  ? `${profiles.length} horses nearby`
                  : screen === "matches"
                  ? `${matches.length} matches`
                  : "your stable"}
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 overflow-hidden relative min-h-0">
          <AnimatePresence mode="wait">
            {screen === "discover" && (
              <motion.div
                key="discover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="h-full"
              >
                <SwipeScreen profiles={profiles} onSwipe={handleSwipe} />
              </motion.div>
            )}

            {screen === "matches" && !activeChat && (
              <motion.div
                key="matches"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="h-full"
              >
                <ChatList
                  matches={matches}
                  chats={chats}
                  onOpenChat={(id) => setActiveChat(id)}
                />
              </motion.div>
            )}

            {screen === "matches" && activeChat && (
              <motion.div
                key={`chat-${activeChat}`}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ChatScreen
                  horse={matches.find((m) => m.id === activeChat)}
                  messages={chats[activeChat] || []}
                  onSend={(text) => handleSendMessage(activeChat, text)}
                  onBack={() => setActiveChat(null)}
                  onUnmatch={() => handleUnmatch(activeChat)}
                />
              </motion.div>
            )}

            {screen === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="h-full"
              >
                <ProfileScreen profile={MY_PROFILE} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom nav */}
        <nav
          className="shrink-0 flex px-2 py-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0d0a1c" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active =
              screen === tab.id || (tab.id === "matches" && screen === "matches")
            const hasNotif = tab.id === "matches" && matches.length > 0

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setScreen(tab.id)
                  if (tab.id !== "matches") setActiveChat(null)
                }}
                className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-colors relative"
                style={{ color: active ? "#ff1f6b" : "rgba(255,255,255,0.3)" }}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                  {hasNotif && !active && (
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                      style={{
                        background: "#ff1f6b",
                        color: "#fff",
                        fontSize: 9,
                      }}
                    >
                      {matches.length > 9 ? "9+" : matches.length}
                    </span>
                  )}
                </div>
                <span
                  className="font-black"
                  style={{ fontSize: 9, letterSpacing: "0.1em" }}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Match modal */}
      <AnimatePresence>
        {showMatch && lastMatch && (
          <MatchModal
            key="match-modal"
            horse={lastMatch}
            onClose={handleMatchClose}
            onKeepSwiping={() => setShowMatch(false)}
          />
        )}
      </AnimatePresence>

      {/* Ad modal — only when not showing a match */}
      <AnimatePresence>
        {showAd && !showMatch && (
          <AdModal key="ad-modal" onClose={() => setShowAd(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
