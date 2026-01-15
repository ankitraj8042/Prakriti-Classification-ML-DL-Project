"""
Flask Backend for Prakriti Classification & Diet Recommendation System
"""
import os
import io
import torch
from torch import nn
from torchvision import models, transforms
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuration
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'resnet50_tongue_augmented.pth')
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Label mapping
LABEL_MAP = {0: "Vata", 1: "Pitta", 2: "Kapha"}

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Diet recommendations based on Prakriti
DIET_RECOMMENDATIONS = {
    "Vata": {
        "description": "Vata represents Air & Space elements. People with Vata prakriti tend to be creative, energetic, and quick-thinking but may experience anxiety and digestive issues when imbalanced.",
        "characteristics": [
            "Light and thin body frame",
            "Quick mind and creative",
            "Tends towards dry skin and hair",
            "Variable appetite and digestion",
            "Light sleeper with active dreams"
        ],
        "dietary_guidelines": "Focus on warm, oily, and nourishing foods. Avoid cold, dry, and raw foods. Eat regular meals at consistent times.",
        "foods_to_favor": [
            "Warm cooked grains (rice, oatmeal, wheat)",
            "Root vegetables (carrots, beets, sweet potatoes)",
            "Healthy fats (ghee, olive oil, sesame oil)",
            "Sweet fruits (bananas, mangoes, dates)",
            "Warm milk with spices",
            "Nuts and seeds (almonds, sesame seeds)",
            "Warming spices (ginger, cinnamon, cumin)"
        ],
        "foods_to_avoid": [
            "Raw vegetables and salads",
            "Cold beverages and ice cream",
            "Dried fruits in excess",
            "Beans (except mung beans)",
            "Bitter and astringent foods",
            "Caffeine and stimulants"
        ],
        "meal_plan": {
            "breakfast": {"food": "Warm oatmeal with ghee, banana, and cinnamon", "calories": 400},
            "mid_morning": {"food": "Soaked almonds and dates with warm milk", "calories": 150},
            "lunch": {"food": "Khichdi with ghee and cooked vegetables", "calories": 600},
            "evening_snack": {"food": "Herbal tea with sesame laddoo", "calories": 150},
            "dinner": {"food": "Rice with moong dal soup and steamed vegetables", "calories": 500}
        }
    },
    "Pitta": {
        "description": "Pitta represents Fire & Water elements. People with Pitta prakriti are typically intelligent, focused, and ambitious but may experience inflammation and irritability when imbalanced.",
        "characteristics": [
            "Medium body frame with good muscle tone",
            "Sharp intellect and focused",
            "Warm body temperature",
            "Strong appetite and metabolism",
            "Sound sleeper but may wake feeling hot"
        ],
        "dietary_guidelines": "Favor cooling and mildly sweet foods. Avoid spicy, sour, or overly oily foods. Stay hydrated and eat at regular intervals.",
        "foods_to_favor": [
            "Cooling grains (rice, barley, oats)",
            "Sweet and bitter vegetables (cucumber, leafy greens)",
            "Coconut oil and ghee",
            "Sweet fruits (melons, pears, grapes)",
            "Coconut water and cool milk",
            "Fresh herbs (mint, coriander, fennel)",
            "Cooling spices (cardamom, fennel, turmeric)"
        ],
        "foods_to_avoid": [
            "Hot spices (chili, cayenne, black pepper)",
            "Sour fruits (citrus, tomatoes)",
            "Fermented foods",
            "Red meat and eggs",
            "Alcohol and coffee",
            "Fried and oily foods"
        ],
        "meal_plan": {
            "breakfast": {"food": "Rice porridge with coconut milk and dates", "calories": 400},
            "mid_morning": {"food": "Cucumber slices and coconut water", "calories": 150},
            "lunch": {"food": "Steamed rice with sautéed greens and dal", "calories": 600},
            "evening_snack": {"food": "Sweet fruits like melon or pear", "calories": 150},
            "dinner": {"food": "Vegetable soup with boiled rice and ghee", "calories": 500}
        }
    },
    "Kapha": {
        "description": "Kapha represents Earth & Water elements. People with Kapha prakriti are typically calm, grounded, and nurturing but may experience weight gain and sluggishness when imbalanced.",
        "characteristics": [
            "Larger body frame with tendency to gain weight",
            "Calm and steady temperament",
            "Smooth, oily skin",
            "Slow but steady metabolism",
            "Deep and prolonged sleep"
        ],
        "dietary_guidelines": "Eat light, dry, and warm foods. Avoid sweets, fried foods, and excessive dairy. Include more pungent and bitter tastes.",
        "foods_to_favor": [
            "Light grains (barley, millet, buckwheat)",
            "Leafy greens and cruciferous vegetables",
            "Light oils (mustard, flaxseed)",
            "Astringent fruits (apples, pears, berries)",
            "Warm herbal teas (ginger, tulsi)",
            "Legumes (lentils, chickpeas)",
            "Warming spices (black pepper, ginger, turmeric)"
        ],
        "foods_to_avoid": [
            "Heavy dairy (cheese, ice cream)",
            "Sweet and salty foods",
            "Fried and oily foods",
            "Sweet fruits (bananas, dates)",
            "Cold beverages",
            "White rice and wheat"
        ],
        "meal_plan": {
            "breakfast": {"food": "Millet porridge with ginger and cinnamon", "calories": 350},
            "mid_morning": {"food": "Green tea and roasted chickpeas", "calories": 150},
            "lunch": {"food": "Barley khichdi with steamed vegetables", "calories": 550},
            "evening_snack": {"food": "Herbal tea and fresh apple", "calories": 150},
            "dinner": {"food": "Light moong soup with vegetables", "calories": 450}
        }
    }
}

# Global model variable
model = None

def load_model():
    """Load the trained ResNet50 model."""
    global model
    if model is None:
        print(f"Loading model from {MODEL_PATH}...")
        model = models.resnet50(weights=None)
        model.fc = nn.Sequential(
            nn.Dropout(0.4),
            nn.Linear(model.fc.in_features, 3)
        )
        model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
        model = model.to(DEVICE)
        model.eval()
        print(f"Model loaded successfully on {DEVICE}")
    return model

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'device': str(DEVICE),
        'model_loaded': model is not None
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Predict Prakriti type from uploaded tongue image.
    Returns prediction with confidence scores and diet recommendations.
    """
    try:
        # Check if image was uploaded
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # Load and preprocess image
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        # Transform image
        input_tensor = transform(image).unsqueeze(0).to(DEVICE)
        
        # Get model and predict
        model = load_model()
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
        
        # Get prediction label
        predicted_prakriti = LABEL_MAP[predicted.item()]
        confidence_score = confidence.item()
        
        # Get all probabilities
        all_probabilities = {
            LABEL_MAP[i]: round(probabilities[0][i].item() * 100, 2)
            for i in range(3)
        }
        
        # Get diet recommendations
        diet_info = DIET_RECOMMENDATIONS[predicted_prakriti]
        
        # Prepare response
        response = {
            'success': True,
            'prediction': {
                'prakriti': predicted_prakriti,
                'confidence': round(confidence_score * 100, 2),
                'probabilities': all_probabilities
            },
            'prakriti_info': {
                'description': diet_info['description'],
                'characteristics': diet_info['characteristics']
            },
            'diet_recommendation': {
                'guidelines': diet_info['dietary_guidelines'],
                'foods_to_favor': diet_info['foods_to_favor'],
                'foods_to_avoid': diet_info['foods_to_avoid'],
                'meal_plan': diet_info['meal_plan']
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/prakriti-info', methods=['GET'])
def get_prakriti_info():
    """Get information about all Prakriti types."""
    return jsonify({
        'prakriti_types': list(DIET_RECOMMENDATIONS.keys()),
        'details': {
            prakriti: {
                'description': info['description'],
                'characteristics': info['characteristics']
            }
            for prakriti, info in DIET_RECOMMENDATIONS.items()
        }
    })

if __name__ == '__main__':
    # Load model on startup
    load_model()
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=True)
