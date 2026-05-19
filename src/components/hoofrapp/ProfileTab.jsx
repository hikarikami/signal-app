import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Edit2, Check } from 'lucide-react'
import { MY_PROFILE } from '@/data/horses'

export default function ProfileTab({ blockedCount }) {
  const [profile, setProfile] = useState(MY_PROFILE)
  const [editBio, setEditBio] = useState(false)
  const [bioText, setBioText] = useState(profile.lifestyle)
  const [newLike, setNewLike] = useState('')
  const [newDislike, setNewDislike] = useState('')

  const addLike = () => {
    if (!newLike.trim()) return
    setProfile(p => ({ ...p, likes: [...p.likes, newLike.trim()] }))
    setNewLike('')
  }

  const removeLike = (item) => setProfile(p => ({ ...p, likes: p.likes.filter(l => l !== item) }))

  const addDislike = () => {
    if (!newDislike.trim()) return
    setProfile(p => ({ ...p, dislikes: [...p.dislikes, newDislike.trim()] }))
    setNewDislike('')
  }

  const removeDislike = (item) => setProfile(p => ({ ...p, dislikes: p.dislikes.filter(d => d !== item) }))

  const saveBio = () => {
    setProfile(p => ({ ...p, lifestyle: bioText }))
    setEditBio(false)
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6">
      {/* Hero */}
      <div className="relative">
        <img src={profile.photo} alt={profile.name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-black">{profile.name}, {profile.age}</h2>
          <p className="text-sm opacity-90">🐴 {profile.breed} · 📍 {profile.location}</p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Personality tags */}
        <div>
          <h3 className="text-sm font-black text-gray-600 uppercase tracking-wide mb-2">Vibe ✨</h3>
          <div className="flex flex-wrap gap-2">
            {profile.personality.map(p => (
              <span key={p} className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 text-pink-500 px-3 py-1 rounded-full font-medium">{p}</span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-black text-gray-600 uppercase tracking-wide">About Me 🐴</h3>
            {!editBio ? (
              <button onClick={() => setEditBio(true)} className="text-pink-400">
                <Edit2 size={14} />
              </button>
            ) : (
              <button onClick={saveBio} className="text-green-500">
                <Check size={14} />
              </button>
            )}
          </div>
          {editBio ? (
            <textarea
              value={bioText}
              onChange={e => setBioText(e.target.value)}
              className="w-full bg-pink-50 border-2 border-pink-200 rounded-2xl p-3 text-sm outline-none focus:border-pink-400 resize-none"
              rows={3}
            />
          ) : (
            <p className="text-sm text-gray-600 bg-pink-50 rounded-2xl p-3">{profile.lifestyle}</p>
          )}
        </div>

        {/* Likes */}
        <div>
          <h3 className="text-sm font-black text-gray-600 uppercase tracking-wide mb-2">Loves 💕</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {profile.likes.map(l => (
              <span key={l} className="flex items-center gap-1 text-xs bg-pink-50 border border-pink-200 text-pink-500 px-3 py-1 rounded-full font-medium">
                {l}
                <button onClick={() => removeLike(l)} className="text-pink-300 hover:text-pink-500"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newLike}
              onChange={e => setNewLike(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addLike()}
              placeholder="Add something you love..."
              className="flex-1 bg-white border-2 border-pink-200 rounded-full px-3 py-1.5 text-xs outline-none focus:border-pink-400"
            />
            <button onClick={addLike} className="w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center shadow">
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Dislikes */}
        <div>
          <h3 className="text-sm font-black text-gray-600 uppercase tracking-wide mb-2">Nopes 🙅</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {profile.dislikes.map(d => (
              <span key={d} className="flex items-center gap-1 text-xs bg-purple-50 border border-purple-200 text-purple-400 px-3 py-1 rounded-full font-medium">
                {d}
                <button onClick={() => removeDislike(d)} className="text-purple-300 hover:text-purple-500"><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newDislike}
              onChange={e => setNewDislike(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addDislike()}
              placeholder="Add something you don't like..."
              className="flex-1 bg-white border-2 border-purple-200 rounded-full px-3 py-1.5 text-xs outline-none focus:border-purple-400"
            />
            <button onClick={addDislike} className="w-8 h-8 rounded-full bg-purple-400 text-white flex items-center justify-center shadow">
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Stats */}
        {blockedCount > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <p className="text-sm text-red-400 font-medium">🚫 {blockedCount} horse{blockedCount > 1 ? 's' : ''} blocked from your hay barn</p>
          </div>
        )}
      </div>
    </div>
  )
}
