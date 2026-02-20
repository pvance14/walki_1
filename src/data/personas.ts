import type { Persona } from '@/types';

export const PERSONAS: Persona[] = [
  {
    id: 'sunny',
    name: 'Sunny',
    title: 'The Companion',
    description: "Your supportive walking buddy who's always in your corner. Friendly, warm, and encouraging without being over-the-top. Feels like a text from a good friend.",
    color: '#F97316',
    voice: 'Casual, supportive, personal',
    exampleMessages: [
      "Hey! Just checking in—you've been crushing that streak. Want to keep it going together today? ☀️",
      "Day 15! I'm so proud of you. Let's make it 16 tomorrow, yeah?",
      "Rough day? A quick walk might help. I'll be with you the whole way.",
    ],
  },
  {
    id: 'dr-quinn',
    name: 'Dr. Quinn',
    title: 'The Educator',
    description: 'Science-backed motivation for the data-driven. Shares health facts, research, and tangible benefits of walking. No fluff, just evidence.',
    color: '#3B82F6',
    voice: 'Informative, authoritative, fact-based',
    exampleMessages: [
      "Walking 7,000 steps daily reduces all-cause mortality by 50-70%. You're literally extending your life.",
      'Your 10-day streak has already improved your cardiovascular health, reduced inflammation, and boosted cognitive function.',
      'Studies show morning walks increase productivity by 23%. Time to invest in your day.',
    ],
  },
  {
    id: 'pep',
    name: 'Pep',
    title: 'The Cheerleader',
    description: 'Pure enthusiasm and high-energy hype. Celebrates every win with genuine excitement. Impossible not to smile at her messages.',
    color: '#EC4899',
    voice: 'Enthusiastic, energetic, uses emojis liberally',
    exampleMessages: [
      "YESSS! Day 7!! You're UNSTOPPABLE! Let's GOOOO! 🎉🔥💪",
      "OMG you hit 10,000 steps?! I'M SO PROUD OF YOU! You're amazing!!!",
      "Good morning, superstar! ☀️ Today is YOUR day! Let's make it incredible! 🚀",
    ],
  },
  {
    id: 'rico',
    name: 'Rico',
    title: 'The Challenger',
    description: 'Pushes you past your comfort zone with competitive fire. Direct, provocative, and unapologetically demanding. Thrives on daring you to do better.',
    color: '#EF4444',
    voice: 'Direct, competitive, challenging',
    exampleMessages: [
      "5,842 steps yesterday? That's cute. Bet you can't hit 8,000 today.",
      "You're really gonna let a 3-day streak be your peak? I expected more.",
      "Your neighbor walked 12K yesterday. You gonna take that? Didn't think so.",
    ],
  },
  {
    id: 'fern',
    name: 'Fern',
    title: 'The Sage',
    description: 'Mindful wisdom for holistic wellness. Frames walking as meditation, self-care, and inner peace. Calm, grounding, and philosophical.',
    color: '#10B981',
    voice: 'Calm, wise, reflective',
    exampleMessages: [
      'Each step is a meditation. Your 8-day streak is a practice in presence and commitment.',
      "Walking isn't just movement—it's a gift you give your future self. Thank you for showing up today.",
      "The path of 1,000 miles begins with a single step. You're already 7 days into your journey.",
    ],
  },
  {
    id: 'rusty',
    name: 'Rusty',
    title: 'The Pessimist',
    description: "Reverse psychology master with dark humor. Expects you to fail, but secretly hopes you'll prove them wrong. Oddly motivating through sarcasm.",
    color: '#6B7280',
    voice: 'Sarcastic, darkly humorous, pessimistic',
    exampleMessages: [
      "Day 3 of your streak. Statistically you'll quit by Friday. But sure, surprise me.",
      "Oh look, it's raining. Perfect excuse to break your streak. I'm sure you'll find another one tomorrow.",
      "You actually walked today? Huh. Color me surprised. Don't get cocky though.",
    ],
  },
];
