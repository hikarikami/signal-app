import { motion } from 'framer-motion'
import { Settings, Edit3, Shield, Star, LogOut } from 'lucide-react'
import { myProfile } from '../../data/horses'

const statItems = [
  { label: 'Likes', value: '47' },
  { label: 'Matches', value: '12' },
  { label: 'Gallops', value: '∞' },
]

const menuItems = [
  { icon: Edit3, label: 'Edit profile', color: '#f97316' },
  { icon: Shield, label: 'Safety settings', color: '#3b82f6' },
  { icon: Star, label: 'HoofR Premium', color: '#a855f7', badge: 'PRO' },
  { icon: Settings, label: 'Settings', color: '#6b7280' },
  { icon: LogOut, label: 'Sign out', color: '#ef4444' },
]

export default function ProfileTab() {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      {/* Profile header */}
      <div
        className="mx-4 mt-2 rounded-3xl overflow-hidden relative flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #fff7ed 0%, #fce7f3 100%)',
          minHeight: 260,
        }}
      >
        {/* Background blur photo */}
        <div className="absolute inset-0">
          <img
            src={myProfile.photo}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative flex flex-col items-center pt-8 pb-6 px-6">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-xl mb-4"
          >
            <img
              src={myProfile.photo}
              alt={myProfile.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900">{myProfile.name}, {myProfile.age}</h2>
          <p className="text-gray-500 text-sm mt-0.5">{myProfile.breed}</p>

          <p className="text-gray-600 text-sm text-center mt-3 leading-relaxed">{myProfile.bio}</p>

          {/* Stats */}
          <div className="flex gap-6 mt-5 pt-5 border-t border-gray-200/60 w-full justify-center">
            {statItems.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-0.5">
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="px-4 mt-4 flex flex-col gap-2">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white shadow-sm w-full text-left"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${item.color}18` }}
            >
              <item.icon className="w-4.5 h-4.5" style={{ color: item.color }} />
            </div>
            <span className="flex-1 font-medium text-gray-800 text-sm">{item.label}</span>
            {item.badge && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
              >
                {item.badge}
              </span>
            )}
            <span className="text-gray-300 text-lg">›</span>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-300 mt-6 px-4">
        HoofR v1.0 · For horses, by horses 🐴
      </p>
    </div>
  )
}
