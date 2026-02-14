import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { Music, PlayCircle, RotateCcw, Play, Pause } from 'lucide-react';

type MoodType = 'sad' | 'stressed' | 'low-energy' | 'happy' | 'motivated';

interface MoodData {
  emoji: string;
  label: string;
  bgColor: string;
  gradient: string;
  music: string;
  plan: string[];
  tip: string;
  particleColor: string;
}

const moodData: Record<MoodType, MoodData> = {
  sad: {
    emoji: '😔',
    label: 'Sad',
    bgColor: 'from-blue-200 to-cyan-200',
    gradient: 'from-blue-400 to-cyan-400',
    music: 'Soothing Piano & Rain Sounds',
    plan: ['🌿 Take a gentle walk', '📝 Journal your feelings', '☕ Have a warm drink', '🎨 Do something creative'],
    tip: "It's okay to feel sad. Be gentle with yourself today. This too shall pass. 💙",
    particleColor: 'bg-blue-300',
  },
  stressed: {
    emoji: '😰',
    label: 'Stressed',
    bgColor: 'from-purple-200 to-pink-200',
    gradient: 'from-purple-400 to-pink-400',
    music: 'Calming Nature & Meditation',
    plan: ['🌬 2-min breathing exercise', '⏱ 25-min focus session', '☕ 5-min break', '📋 Prioritize 3 tasks'],
    tip: "Break things into smaller steps. You've handled tough days before. You've got this! 💪✨",
    particleColor: 'bg-purple-300',
  },
  'low-energy': {
    emoji: '😴',
    label: 'Low Energy',
    bgColor: 'from-yellow-100 to-orange-100',
    gradient: 'from-yellow-400 to-orange-400',
    music: 'Gentle Acoustic & Coffee Shop',
    plan: ['💤 15-min power nap', '🚶 Light stretching', '💧 Drink water', '🍎 Healthy snack'],
    tip: 'Rest is productive too. Listen to your body and recharge. 🔋',
    particleColor: 'bg-yellow-300',
  },
  happy: {
    emoji: '😊',
    label: 'Happy',
    bgColor: 'from-green-200 to-teal-200',
    gradient: 'from-green-400 to-teal-400',
    music: 'Upbeat Acoustic & Feel Good',
    plan: ['✨ Start your favorite task', '🎯 Set ambitious goals', '🤝 Connect with someone', '🎉 Celebrate small wins'],
    tip: 'Great energy! Channel this positivity into meaningful work. ✨',
    particleColor: 'bg-green-300',
  },
  motivated: {
    emoji: '🚀',
    label: 'Motivated',
    bgColor: 'from-orange-200 to-red-200',
    gradient: 'from-orange-400 via-red-400 to-pink-400',
    music: 'Epic Focus & Productivity Beats',
    plan: ['🎯 Tackle hardest task first', '⏱ Deep work: 50 min blocks', '🚫 Eliminate distractions', '📈 Track your progress'],
    tip: "You're on fire! 🔥 Ride this wave and make amazing things happen! 🚀",
    particleColor: 'bg-orange-300',
  },
};

export function MoodAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mood, text, result } =
  (location.state as {
    mood: MoodType;
    text: string;
    result: any;
  }) || {};


  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mood) {
      navigate('/');
    }
  }, [mood, navigate]);

  useEffect(() => {
    if (mood === 'motivated') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [mood]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  if (!mood) return null;
  
  const data = result || moodData[mood];
  if (!data) return null;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className={`fixed inset-0 bg-gradient-to-br ${data.bgColor}`} />

      {/* Particles effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {mood === 'stressed' &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${data.particleColor}/40`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, -200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

        {showConfetti &&
          [...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
                background: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][
                  Math.floor(Math.random() * 5)
                ],
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-8 max-w-6xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all text-gray-700 font-medium"
          >
            ← Back
          </Link>
        </motion.div>

        {/* Mood header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-9xl mb-4 inline-block"
          >
            {data.emoji}
          </motion.div>
          <h1 className="text-5xl font-bold mb-2 text-gray-800">
            You're feeling <span className={`bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent`}>{data.label}</span>
          </h1>
          <p className="text-xl text-gray-600">
            {mood === 'stressed' ? "Let's calm your mind and refocus 🌿" : 
             mood === 'sad' ? "Let's find comfort together 💙" :
             mood === 'low-energy' ? "Let's help you recharge 🔋" :
             mood === 'happy' ? "Let's make the most of this energy! ✨" :
             "Let's channel this momentum! 🚀"}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Music Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            className="bg-white/50 backdrop-blur-lg rounded-3xl p-6 border border-white/60 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-800">Music Match 🎧</h3>
            </div>
            <p className="text-gray-600 mb-4">{data.music}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-xl bg-gradient-to-r ${data.gradient} text-white font-semibold flex items-center justify-center gap-2 shadow-lg`}
            >
              <PlayCircle className="w-5 h-5" />
              Play Music
            </motion.button>
          </motion.div>

          {/* Productivity Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            className="bg-white/50 backdrop-blur-lg rounded-3xl p-6 border border-white/60 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Action Plan 📋</h3>
            <ul className="space-y-3">
              {data.plan.map((item: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <span className="text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Motivation Tip Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            className="bg-white/50 backdrop-blur-lg rounded-3xl p-6 border border-white/60 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Motivation Boost 💡</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{data.tip}</p>
          </motion.div>
        </div>

        {/* Pomodoro Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/50 backdrop-blur-lg rounded-3xl p-8 border border-white/60 shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Pomodoro Timer ⏳
          </h2>
          
          <div className="flex flex-col items-center">
            {/* Circular timer */}
            <div className="relative w-64 h-64 mb-8">
              {/* Background circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                  initial={false}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 120 * (1 - progress / 100),
                  }}
                  transition={{ duration: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Timer display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={isRunning ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
                >
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </motion.div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRunning(!isRunning)}
                disabled={timeLeft === 0}
                className={`px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2 shadow-lg ${
                  timeLeft === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : `bg-gradient-to-r ${data.gradient}`
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" /> Start
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(25 * 60);
                }}
                className="px-8 py-4 rounded-xl font-semibold bg-white/70 hover:bg-white/90 transition-all text-gray-700 flex items-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-5 h-5" /> Reset
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
