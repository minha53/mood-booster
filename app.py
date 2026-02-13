from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Mood recommendations
recommendations = {
    "stressed": {
        "music": "https://www.youtube.com/watch?v=lFcSrYw-ARY",
        "plan": "Do 2‑minute breathing → 25‑minute focus → 5‑minute break",
        "tip": "Relax. Take deep breaths and focus on one task."
    },
    "low_energy": {
        "music": "https://www.youtube.com/watch?v=5qap5aO4i9A",
        "plan": "Start small task → Listen to music → Continue gradually",
        "tip": "Drink water and stretch."
    },
    "motivated": {
        "music": "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
        "plan": "Start hardest task → Use Pomodoro → Avoid distractions",
        "tip": "Great energy! Use it wisely."
    }
}

def detect_mood(text):

    text = text.lower()

    stressed = ["stress", "tired", "sad", "angry", "upset"]
    motivated = ["happy", "excited", "motivated", "good", "great"]

    for word in stressed:
        if word in text:
            return "stressed"

    for word in motivated:
        if word in text:
            return "motivated"

    return "low_energy"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()
    text = data["text"]

    mood = detect_mood(text)
    rec = recommendations[mood]

    return jsonify({
        "mood": mood.capitalize(),
        "music": rec["music"],
        "plan": rec["plan"],
        "tip": rec["tip"]
    })


if __name__ == "__main__":
    app.run(debug=True)