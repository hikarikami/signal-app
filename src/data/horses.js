import horse1 from '../assets/horse-pics/horse-1.jpg'
import horse2 from '../assets/horse-pics/horse-2.jpg'
import horse3 from '../assets/horse-pics/horse-3.jpg'
import horse4 from '../assets/horse-pics/horse-4.jpg'
import horse5 from '../assets/horse-pics/horse-5.jpg'
import horse6 from '../assets/horse-pics/horse-6.jpg'
import horse7 from '../assets/horse-pics/horse-7.jpg'
import horse8 from '../assets/horse-pics/horse-8.jpg'

export const horses = [
  {
    id: 1,
    name: 'Haybale Hannah',
    age: 4,
    breed: 'Andalusian',
    distance: '2 miles away',
    bio: "Looking for a stallion who won't ghost me after the first canter. Loves apples, hates farriers. Will absolutely bolt at plastic bags — no exceptions.",
    interests: ['Apples 🍎', 'Sunrise trots 🌅', 'Rolling in mud'],
    photo: horse1,
  },
  {
    id: 2,
    name: 'Thunder McNeigh',
    age: 6,
    breed: 'Thoroughbred',
    distance: '5 miles away',
    bio: "Divorced dad of 3 foals. I'm basically the Hemsworth of the stable. My mane takes 2 hours but it's worth it. Mutual mane appreciation is a dealbreaker.",
    interests: ['Racing 🏆', 'Grooming sessions', 'Carrots 🥕'],
    photo: horse2,
  },
  {
    id: 3,
    name: 'Duchess Cloppington',
    age: 8,
    breed: 'Warmblood',
    distance: '1 mile away',
    bio: "Dressage queen who moonlights as a show jumper. Intolerances: fly spray, Mondays, and mares who chew with their mouths open.",
    interests: ['Dressage 🎀', 'Show jumping', 'Posh hay'],
    photo: horse3,
  },
  {
    id: 4,
    name: 'Sir Gallops-a-Lot',
    age: 5,
    breed: 'Quarter Horse',
    distance: '3 miles away',
    bio: "I put the 'neigh' in neighbourhood watch. GSOH essential — I once ate my owner's passport and I'm not sorry. Stable references available on request.",
    interests: ['Trail riding', 'Snacking 🌾', 'Light crime'],
    photo: horse4,
  },
  {
    id: 5,
    name: 'Meadow',
    age: 3,
    breed: 'Paint Horse',
    distance: '7 miles away',
    bio: "New to HoofR but not new to rolling in mud. My love language is mutual grooming and not being ridden up steep hills. A work in progress, honestly.",
    interests: ['Mud baths 💅', 'Butterflies 🦋', 'Vibes'],
    photo: horse5,
  },
  {
    id: 6,
    name: 'Biscuit',
    age: 7,
    breed: 'Cob',
    distance: '4 miles away',
    bio: "Technically not a stallion anymore but I'm very emotionally available. Interests: carrots, grass, more carrots, and the occasional meaningful conversation about hay.",
    interests: ['Carrots 🥕', 'Emotional depth', 'Grazing'],
    photo: horse6,
  },
  {
    id: 7,
    name: 'Storm',
    age: 9,
    breed: 'Arabian',
    distance: '6 miles away',
    bio: "I'm the horse your mum warned you about. Will spook at literally nothing. Expert escape artist. Previous owners describe me as having 'character'. They're not wrong.",
    interests: ['Escaping 🚪', 'Drama 🌩️', 'Running free'],
    photo: horse7,
  },
  {
    id: 8,
    name: 'Copperfield',
    age: 11,
    breed: 'Hanoverian',
    distance: '8 miles away',
    bio: "Distinguished silver temples (okay, grey patches). I have charisma, charm, and a slight navicular issue I'd prefer not to discuss on the first date.",
    interests: ['Philosophy 🧠', 'Long walks', 'Apples 🍎'],
    photo: horse8,
  },
]

export const myProfile = {
  name: 'Clover',
  age: 5,
  breed: 'Irish Sport Horse',
  bio: "Looking for my stable mate. Allergic to drama but willing to make exceptions for someone with a good mane.",
  photo: horse5,
}

export const fakeConversations = [
  {
    id: 1,
    horse: { name: 'Thunder McNeigh', photo: horse2 },
    lastMessage: "So... do you also eat your owner's phone chargers or is that just me?",
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    horse: { name: 'Duchess Cloppington', photo: horse3 },
    lastMessage: "My dressage trainer says I have star potential. Just putting that out there.",
    time: '1h ago',
    unread: false,
  },
  {
    id: 3,
    horse: { name: 'Biscuit', photo: horse6 },
    lastMessage: "Would you like to go for a gentle trot sometime? Nothing too steep.",
    time: '3h ago',
    unread: true,
  },
]
