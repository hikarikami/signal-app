import horse1 from '@/assets/horse-pics/horse-1.jpg'
import horse2 from '@/assets/horse-pics/horse-2.jpg'
import horse3 from '@/assets/horse-pics/horse-3.jpg'
import horse4 from '@/assets/horse-pics/horse-4.jpg'
import horse5 from '@/assets/horse-pics/horse-5.jpg'
import horse6 from '@/assets/horse-pics/horse-6.jpg'
import horse7 from '@/assets/horse-pics/horse-7.jpg'
import horse8 from '@/assets/horse-pics/horse-8.jpg'

export const MY_PROFILE = {
  id: 0,
  name: "Starlight Muffin",
  age: 5,
  breed: "Andalusian",
  location: "Glitter Meadows",
  photo: horse1,
  personality: ["Bubbly", "Creative", "Night Owl"],
  lifestyle: "I love moonlit gallops and artisanal oat bars. Looking for a stable connection!",
  likes: ["Sparkly hoofwear", "Sunset gallops", "Oat lattes", "Flower crowns"],
  dislikes: ["Mud on clean hooves", "Hay that smells weird", "Early morning farriers"],
  horseType: "Andalusian",
}

export const ALL_HORSES = [
  {
    id: 1,
    name: "Biscuit Thundermane",
    age: 7,
    breed: "Arabian",
    location: "Clover Hill Stables",
    photo: horse2,
    personality: ["Adventurous", "Foodie", "Chaotic"],
    lifestyle: "Professional carrot connoisseur. Will gallop for snacks. Certified hay sommelier.",
    likes: ["Carrots (obviously)", "Wind in my mane", "Jumping fences for fun", "Dawn patrol gallops"],
    dislikes: ["Slow trots", "Low-quality hay", "Vet visits", "Mondays"],
    horseType: "Arabian",
  },
  {
    id: 2,
    name: "Princess Cloppington",
    age: 4,
    breed: "Friesian",
    location: "Royal Pastures",
    photo: horse3,
    personality: ["Elegant", "Dramatic", "Bookish"],
    lifestyle: "I read equestrian poetry by the stream. Looking for someone who appreciates fine grass.",
    likes: ["Poetry", "Braided manes", "Fancy saddle pads", "Classical trot music"],
    dislikes: ["Rushed feeding times", "Ungroomed tails", "Loud barn music"],
    horseType: "Friesian",
  },
  {
    id: 3,
    name: "Nugget McHooves",
    age: 6,
    breed: "Shetland Pony",
    location: "Tiny Acres Farm",
    photo: horse4,
    personality: ["Tiny but mighty", "Mischievous", "Loud"],
    lifestyle: "Small horse. Big energy. I will eat your hat. Legend in the paddock.",
    likes: ["Escaping fences", "Apple theft", "Being underestimated", "Tiny hats"],
    dislikes: ["Being called 'cute'", "Jumps I can't reach", "Large horses looking down"],
    horseType: "Shetland Pony",
  },
  {
    id: 4,
    name: "Velvet Stargazer",
    age: 8,
    breed: "Thoroughbred",
    location: "Stardust Racing Club",
    photo: horse5,
    personality: ["Competitive", "Dreamy", "Fast"],
    lifestyle: "Former racing horse turned life coach. Retired but still faster than you.",
    likes: ["Speed", "Trophy shelves", "Inspirational neighs", "Protein-rich hay"],
    dislikes: ["Anyone faster than me (no one)", "Slow lanes", "Participation ribbons"],
    horseType: "Thoroughbred",
  },
  {
    id: 5,
    name: "Buttercup Boomhoof",
    age: 5,
    breed: "Clydesdale",
    location: "Booming Meadow Ranch",
    photo: horse6,
    personality: ["Gentle giant", "Cozy", "Chef"],
    lifestyle: "I make the best grass smoothies in the valley. My hoofbeats are my love language.",
    likes: ["Grass smoothies", "Big warm barns", "Cuddle puddles", "Slow sunsets"],
    dislikes: ["Tight spaces", "Rushing", "Being asked to be small"],
    horseType: "Clydesdale",
  },
  {
    id: 6,
    name: "Sparkle von Prancealot",
    age: 3,
    breed: "Lipizzaner",
    location: "Vienna Paddock",
    photo: horse7,
    personality: ["Showoff", "Artistic", "Extra"],
    lifestyle: "Dressage is my therapy. Every trot is a performance. The arena is my stage.",
    likes: ["Dressage", "Sequined blankets", "Standing ovations", "Mirror selfies"],
    dislikes: ["Casual trots", "Unflattering lighting", "Being ignored"],
    horseType: "Lipizzaner",
  },
  {
    id: 7,
    name: "Dumpling Cloverfoot",
    age: 9,
    breed: "Haflinger",
    location: "Cozy Corner Farm",
    photo: horse8,
    personality: ["Wholesome", "Sleepy", "Sweet"],
    lifestyle: "Certified nap champion. Will cuddle for treats. Looking for my forever paddock mate.",
    likes: ["Napping in sun patches", "Warm hay bales", "Long ear scratches", "Gentle rain"],
    dislikes: ["Alarm clocks", "Cold mornings", "Energy drinks"],
    horseType: "Haflinger",
  },
]

export const HORSE_TYPES = [
  "All Types",
  "Arabian",
  "Thoroughbred",
  "Friesian",
  "Andalusian",
  "Clydesdale",
  "Shetland Pony",
  "Lipizzaner",
  "Haflinger",
  "Quarter Horse",
  "Mustang",
  "Appaloosa",
]

export const INITIAL_MESSAGES = {
  1: [
    { id: 1, from: 'them', text: "Omg hi!! I saw you like oat lattes too 🥺✨", time: "2:34 PM" },
    { id: 2, from: 'me', text: "YES! Oat latte with extra hay foam is everything", time: "2:35 PM" },
    { id: 3, from: 'them', text: "We are literally the same horse 🐴💕", time: "2:36 PM" },
  ],
  5: [
    { id: 1, from: 'them', text: "Your flower crown in your photos is SO cute 🌸", time: "Yesterday" },
    { id: 2, from: 'me', text: "Aww thank you!! I made it myself hehe", time: "Yesterday" },
  ],
}
