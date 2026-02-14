from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Mood-based responses with music links
mood_data = {
    "sad": {
        "emoji": "😔",
        "suggestion": "Take things slowly today and focus on small wins.",
        "tip": "It's okay to feel sad. Be gentle with yourself 💙",
        "music": [
        {
            "title": "Soothing Piano",
            "link": "https://www.youtube.com/embed/2OEL4P1Rz04"
        },
        {
            "title": "Peaceful Meditation",
            "link": "https://www.youtube.com/embed/inpok4MKVLM"
        },
        {
            "title": "Soft Guitar",
            "link": "https://www.youtube.com/embed/4Tr0otuiQuU"
        }
    ],
        "plan": [
            "Take a short walk 🌿",
            "Write your thoughts 📝",
            "Listen to calming music 🎧"
        ]
    },
    "stressed": {
        "emoji": "😰",
        "suggestion": "Try a 25-minute focus session with deep breathing.",
        "tip": "Break tasks into small steps. You've got this! 💪",
        "music": {
            "title": "Relaxing Nature Sounds",
            "link": "https://www.youtube.com/watch?v=lFcSrYw-ARY"
        },
        "plan": [
            "2-min breathing exercise 🌬",
            "25-min Pomodoro ⏱",
            "5-min break ☕"
        ]
    },
    "low-energy": {
        "emoji": "😴",
        "suggestion": "Recharge with rest and hydration.",
        "tip": "Rest is productive too 🔋",
        "music": {
            "title": "Chill Coffee Shop Vibes",
            "link": "https://www.youtube.com/watch?v=5qap5aO4i9A"
        },
        "plan": [
            "Drink water 💧",
            "Light stretching 🚶",
            "Short power nap 💤"
        ]
    },
    "happy": {
        "emoji": "😊",
        "suggestion": "Use this positive energy to tackle important tasks!",
        "tip": "Channel this positivity into meaningful work ✨",
        "music": {
            "title": "Feel Good Acoustic",
            "link": "https://www.youtube.com/watch?v=ZbZSe6N_BXs"
        },
        "plan": [
            "Start your favorite task 🎯",
            "Set a big goal 🚀",
            "Celebrate small wins 🎉"
        ]
    },
    "motivated": {
        "emoji": "🚀",
        "suggestion": "Deep work session — no distractions!",
        "tip": "You're on fire! Keep going 🔥",
        "music": {
            "title": "Epic Productivity Beats",
            "link": "https://www.youtube.com/watch?v=WPni755-Krg"
        },
        "plan": [
            "Hardest task first 💥",
            "50-min deep work ⏱",
            "Track progress 📈"
        ]
    }
}

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    mood = data.get("mood")
    text = data.get("text")

    if mood not in mood_data:
        return jsonify({"error": "Invalid mood"}), 400

    response = {
        "mood": mood,
        "text": text,
        **mood_data[mood]
    }

    return jsonify(response)

@app.route("/")
def home():
    return "Mood Booster Backend Running 🚀"

if __name__ == "__main__":
    app.run(debug=True)

