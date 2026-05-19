import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X, Crown } from 'lucide-react'
import { ALL_HORSES, HORSE_TYPES } from '@/data/horses'

export default function SearchTab({ onViewProfile, blockedIds, hasPremium, onShowPaywall }) {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')

  const results = ALL_HORSES.filter(h => {
    if (blockedIds.includes(h.id)) return false
    const matchesType = selectedType === 'All Types' || h.breed === selectedType
    const q = query.toLowerCase()
    const matchesQuery = !q || h.name.toLowerCase().includes(q) || h.breed.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)
    return matchesType && matchesQuery
  })

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 space-y-3">
        <h2 className="text-xl font-black text-gray-800">Find Your Herd 🔍</h2>

        {/* Search input */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, breed, location..."
            className="w-full bg-white border-2 border-pink-200 rounded-full pl-9 pr-9 py-2.5 text-sm outline-none focus:border-pink-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Type filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {HORSE_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all ${
                selectedType === type
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white border-transparent shadow-sm'
                  : 'bg-white border-pink-200 text-pink-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <div className="text-4xl">🐴</div>
            <p className="text-sm text-purple-400">No horses found in this pasture</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((horse, i) => {
              const locked = horse.breed === 'Thoroughbred' && !hasPremium
              return (
                <motion.button
                  key={horse.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => locked ? onShowPaywall() : onViewProfile(horse)}
                  className={`bg-white rounded-2xl overflow-hidden border-2 shadow-sm active:scale-95 text-left ${locked ? 'border-yellow-200' : 'border-pink-100'}`}
                >
                  <div className="relative">
                    <img src={horse.photo} alt={horse.name} className={`w-full h-32 object-cover ${locked ? 'blur-sm' : ''}`} />
                    {locked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/20">
                        <div className="bg-white rounded-full p-2 shadow"><Crown size={18} className="text-yellow-500" /></div>
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className={`font-bold text-sm truncate ${locked ? 'blur-sm' : 'text-gray-800'}`}>{horse.name}</p>
                    <p className={`text-xs ${locked ? 'text-yellow-500 font-semibold' : 'text-purple-400'}`}>{locked ? '👑 Premium' : horse.breed}</p>
                    <p className="text-xs text-gray-400 truncate">📍 {horse.location}</p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
