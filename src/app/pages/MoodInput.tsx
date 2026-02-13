import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

type MoodType =
  | "sad"
  | "stressed"
  | "low-energy"
  | "happy"
  | "motivated"
  | null;

const moods = [
  { id: "sad" as const, emoji: "😔", label: "Sad" },
  { id: "stressed" as const, emoji: "😰", label: "Stressed" },
  {
    id: "low-energy" as const,
    emoji: "😴",
    label: "Low Energy",
  },
  { id: "happy" as const, emoji: "😊", label: "Happy" },
  { id: "motivated" as const, emoji: "🚀", label: "Motivated" },
];

export function MoodInput() {
  const [moodText, setMoodText] = useState("");
  const [selectedMood, setSelectedMood] =
    useState<MoodType>(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!selectedMood) return;

    try {
      const response = await fetch(
        "http://127.0.0.1:5000",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: moodText,
            mood: selectedMood,
          }),
        },
      );

      const data = await response.json();

      // Navigate and send backend result
      navigate("/analysis", {
        state: {
          mood: selectedMood,
          text: moodText,
          result: data,
        },
      });
    } catch (error) {
      console.error("Error analyzing mood:", error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 animate-gradient" />

      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          {/* Glass card */}
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                How are you feeling today? 😊✨
              </h1>
              <p className="text-center text-gray-600 mb-8 text-lg">
                Tell us your mood and we'll help you feel more
                productive 💫
              </p>
            </motion.div>

            {/* Textarea */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <textarea
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                placeholder="I feel stressed about exams..."
                className="w-full h-40 p-5 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-200/50 resize-none transition-all bg-white/60 backdrop-blur-sm text-gray-800 placeholder:text-gray-400"
              />
            </motion.div>

            {/* Emoji mood selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                Select your mood:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {moods.map((mood) => (
                  <motion.button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                      selectedMood === mood.id
                        ? "bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg scale-105"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  >
                    <motion.span
                      className="text-4xl"
                      animate={
                        selectedMood === mood.id
                          ? {
                              rotate: [0, -10, 10, -10, 0],
                              scale: [1, 1.2, 1],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {mood.emoji}
                    </motion.span>
                    <span
                      className={`text-sm font-medium ${
                        selectedMood === mood.id
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {mood.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Analyze button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <motion.button
                onClick={handleAnalyze}
                disabled={!selectedMood}
                whileHover={
                  selectedMood
                    ? {
                        scale: 1.02,
                        boxShadow:
                          "0 20px 40px rgba(168, 85, 247, 0.4)",
                      }
                    : {}
                }
                whileTap={selectedMood ? { scale: 0.98 } : {}}
                className={`w-full py-5 rounded-2xl font-semibold text-lg transition-all ${
                  selectedMood
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Analyze Mood ✨
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}