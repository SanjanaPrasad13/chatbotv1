from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/demo', methods=['GET'])
def check():
    return jsonify(status="success", message="Flask server is running!")


@app.route('/message', methods=['POST'])
def handle_message():
    data = request.json
    user_message = data['message']
    user_topic = data.get('topic', 'All')  # Default to 'All' if no topic is provided
    if "hello" in user_message.lower():
        bot_response_text = "Hello there! How can I assist you today?"
    elif "help" in user_message.lower():
        bot_response_text = "Sure, I'm here to help. What do you need assistance with?"
    else:
        bot_response_text = "I'm not quite sure how to respond to that. Can you rephrase?"

    bot_response = {
            'text': bot_response_text,
            'sender': 'bot'
        }
    return jsonify(bot_response)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
