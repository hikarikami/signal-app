import { motion } from "framer-motion"

export default function ProfileScreen({ profile }) {
  return (
    <div className="h-full overflow-y-auto pb-4">
      <div className="relative" style={{ height: "300px" }}>
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0812] via-[#0a0812]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <h1 className="text-white font-black text-3xl leading-tight">{profile.name}</h1>
          <p className="text-white/55 text-sm mt-0.5">{profile.age} years old · {profile.job}</p>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        <div className="bg-[#130f24] rounded-2xl p-4 border border-white/5">
          <p className="text-[#ff1f6b] text-[11px] font-black uppercase tracking-widest mb-2">
            About Me
          </p>
          <p className="text-white/75 text-sm leading-relaxed">{profile.bio}</p>
        </div>

        <div className="bg-[#130f24] rounded-2xl p-4 border border-white/5">
          <p className="text-[#ff1f6b] text-[11px] font-black uppercase tracking-widest mb-3">
            Interests
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="text-[#ff1f6b] text-xs px-3 py-1.5 rounded-full font-bold border border-[#ff1f6b]/25 bg-[#ff1f6b]/8"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Matches", value: "∞", icon: "💖" },
            { label: "Fields", value: "1", icon: "🌾" },
            { label: "Hay Rating", value: "9.2", icon: "⭐" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileTap={{ scale: 0.95 }}
              className="bg-[#130f24] rounded-2xl p-3 text-center border border-white/5"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-white font-black text-xl">{stat.value}</div>
              <div className="text-white/35 text-xs mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div
          className="rounded-2xl p-4 text-center border"
          style={{
            background: "linear-gradient(135deg, rgba(155,77,255,0.08), rgba(255,31,107,0.08))",
            borderColor: "rgba(155,77,255,0.2)",
          }}
        >
          <p className="text-[#9b4dff] text-xs font-bold">✨ Hoofer Premium</p>
          <p className="text-white/40 text-xs mt-1">
            Unlock unlimited neighs, advanced hay filters & who liked you
          </p>
        </div>
      </div>
    </div>
  )
}
