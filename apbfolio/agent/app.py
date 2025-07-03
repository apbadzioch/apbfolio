from flask import Flask, request, jsonify
from flask_cors import CORS
from core import get_response

app = Flask(__name__)
CORS(app) # Enable CORS for connectivity from frontend

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")
    reply = get_response(user_input)
    return jsonify({"response": reply})

if __name__ == "__main++":
    app.run(debug=True)