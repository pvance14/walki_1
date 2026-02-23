import type { QuizQuestion } from '@/types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: "It's 9 PM. You're 2,000 steps short of your daily goal. What gets you moving?",
    options: [
      {
        id: 'q1a',
        text: 'A friend would be proud of me for finishing strong',
        scores: { sunny: 2, pep: 1 },
      },
      {
        id: 'q1b',
        text: 'Missing a day means higher risk of heart disease',
        scores: { 'dr-quinn': 3 },
      },
      {
        id: 'q1c',
        text: 'I refuse to break my 12-day streak',
        scores: { rico: 2, fern: 1 },
      },
      {
        id: 'q1d',
        text: 'A walk would actually help me decompress',
        scores: { fern: 2, sunny: 1 },
      },
    ],
  },
  {
    id: 'q2',
    question: 'You just completed 7 straight days of walking! What message would make you happiest?',
    options: [
      {
        id: 'q2a',
        text: "OMG YOU'RE INCREDIBLE! 🎉 I KNEW YOU COULD DO IT!",
        scores: { pep: 3 },
      },
      {
        id: 'q2b',
        text: '7 days = 51% lower cardiovascular risk. Your body thanks you.',
        scores: { 'dr-quinn': 3 },
      },
      {
        id: 'q2c',
        text: 'Week one down. Think you can make it to 14? Prove it.',
        scores: { rico: 3 },
      },
      {
        id: 'q2d',
        text: "Hey, that's awesome! So proud of you, friend.",
        scores: { sunny: 3 },
      },
    ],
  },
  {
    id: 'q3',
    question: 'Why do you want to walk more consistently?',
    options: [
      {
        id: 'q3a',
        text: 'To feel energized and proud of myself',
        scores: { pep: 2, sunny: 1 },
      },
      {
        id: 'q3b',
        text: "For specific health benefits I'm looking to achieve",
        scores: { 'dr-quinn': 3 },
      },
      {
        id: 'q3c',
        text: 'To prove I can stick with something',
        scores: { rico: 2, rusty: 1 },
      },
      {
        id: 'q3d',
        text: 'To clear my mind and reduce stress',
        scores: { fern: 3 },
      },
    ],
  },
  {
    id: 'q4',
    question: 'Which message style resonates most with you?',
    options: [
      {
        id: 'q4a',
        text: 'Warm and supportive, like a good friend',
        scores: { sunny: 3 },
      },
      {
        id: 'q4b',
        text: 'Direct and fact-based, no fluff',
        scores: { 'dr-quinn': 2, rico: 1 },
      },
      {
        id: 'q4c',
        text: 'Playful and high-energy',
        scores: { pep: 3 },
      },
      {
        id: 'q4d',
        text: 'Calm and thoughtful',
        scores: { fern: 3 },
      },
    ],
  },
  {
    id: 'q5',
    question: 'You missed a day and broke your streak. What helps you restart?',
    options: [
      {
        id: 'q5a',
        text: "Encouragement that it's okay and I can start fresh",
        scores: { sunny: 2, pep: 1 },
      },
      {
        id: 'q5b',
        text: 'Reminder that consistency matters more than perfection',
        scores: { fern: 2, 'dr-quinn': 1 },
      },
      {
        id: 'q5c',
        text: 'A challenge to beat my old record',
        scores: { rico: 3 },
      },
      {
        id: 'q5d',
        text: "Blunt honesty: 'You said you'd do this. Do it.'",
        scores: { rusty: 2, rico: 1 },
      },
    ],
  },
  {
    id: 'q6',
    question: 'How do you feel about dark humor / sarcasm?',
    options: [
      {
        id: 'q6a',
        text: 'Love it! Makes things fun',
        scores: { rusty: 3, rico: 1 },
      },
      {
        id: 'q6b',
        text: 'Occasionally funny, but prefer positivity',
        scores: { pep: 2, sunny: 1 },
      },
      {
        id: 'q6c',
        text: 'Not really my thing',
        scores: { 'dr-quinn': 2, fern: 1 },
      },
      {
        id: 'q6d',
        text: 'Depends on my mood',
        scores: { sunny: 1, 'dr-quinn': 1, pep: 1, rico: 1, fern: 1, rusty: 1 },
      },
    ],
  },
  {
    id: 'q7',
    question: 'If you had to walk with someone every day, who would you pick?',
    options: [
      {
        id: 'q7a',
        text: 'An enthusiastic friend who celebrates every mile',
        scores: { pep: 2, sunny: 1 },
      },
      {
        id: 'q7b',
        text: 'A knowledgeable coach who teaches me about fitness',
        scores: { 'dr-quinn': 3 },
      },
      {
        id: 'q7c',
        text: 'A competitive rival who pushes me to go further',
        scores: { rico: 3 },
      },
      {
        id: 'q7d',
        text: 'A wise mentor who makes walks feel meditative',
        scores: { fern: 3 },
      },
    ],
  },
  {
    id: 'q8',
    question: "You have a packed schedule and only 15 minutes to spare. How do you justify a short walk?",
    options: [
      {
        id: 'q8a',
        text: 'Even a short burst of movement improves cognitive function and blood flow.',
        scores: { 'dr-quinn': 3 },
      },
      {
        id: 'q8b',
        text: "I promised myself I'd do something today, and I don't want to let myself down.",
        scores: { sunny: 2, fern: 1 },
      },
      {
        id: 'q8c',
        text: "15 minutes is better than 0. Don't let the day win—get out there!",
        scores: { rico: 3 },
      },
      {
        id: 'q8d',
        text: 'Use this time to breathe and reset your nervous system.',
        scores: { fern: 3 },
      },
    ],
  },
  {
    id: 'q9',
    question: "What kind of 'reward' for hitting a milestone actually feels valuable to you?",
    options: [
      {
        id: 'q9a',
        text: 'A digital trophy or a shoutout on a leaderboard.',
        scores: { rico: 2, pep: 1 },
      },
      {
        id: 'q9b',
        text: 'A summary report showing exactly how much my fitness has improved.',
        scores: { 'dr-quinn': 3 },
      },
      {
        id: 'q9c',
        text: "A heartfelt 'I'm so impressed by your dedication' message.",
        scores: { sunny: 2, pep: 1 },
      },
      {
        id: 'q9d',
        text: "The quiet satisfaction of knowing I'm becoming a more disciplined person.",
        scores: { fern: 2, rusty: 1 },
      },
    ],
  },
  {
    id: 'q10',
    question: "It's raining outside and you really don't want to go. What's the one thing that gets you out the door?",
    options: [
      {
        id: 'q10a',
        text: "The rain won't melt you. Stop making excuses and go.",
        scores: { rusty: 3, rico: 1 },
      },
      {
        id: 'q10b',
        text: "Think of how cozy and accomplished you'll feel when you get back inside!",
        scores: { pep: 2, sunny: 1 },
      },
      {
        id: 'q10c',
        text: 'Walking in nature—even in the rain—can be a powerful grounding experience.',
        scores: { fern: 3 },
      },
      {
        id: 'q10d',
        text: "Rain gear exists for a reason; your cardiovascular goals don't care about the weather.",
        scores: { 'dr-quinn': 2, rico: 1 },
      },
    ],
  },
];
