from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
model = joblib.load('cyberbullying_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data['text']
    
    prediction = model.predict([text])[0]
    probabilities = model.predict_proba([text])[0]
    confidence = max(probabilities)
    
    return jsonify({
        'text': text,
        'prediction': prediction,
        'confidence': round(confidence, 3)
    })

if __name__ == '__main__':
    app.run(port=5000)