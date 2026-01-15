# 🌿 Prakriti Analysis - Ayurvedic Diet Recommendation System

A modern web application that uses deep learning to analyze tongue images and determine your Ayurvedic body constitution (Prakriti), providing personalized diet recommendations.

![Prakriti Types](https://img.shields.io/badge/Prakriti-Vata%20%7C%20Pitta%20%7C%20Kapha-green)
![Model](https://img.shields.io/badge/Model-ResNet50-blue)
![Accuracy](https://img.shields.io/badge/Accuracy-88%25-brightgreen)

## 🎯 Features

- **AI-Powered Analysis**: Upload a tongue image to get instant Prakriti classification
- **High Accuracy**: ResNet50 model trained on 5000+ augmented images (88% accuracy)
- **Personalized Recommendations**: Get customized diet plans based on your Prakriti
- **Beautiful UI**: Modern, light, and aesthetic React interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
website/
├── backend/
│   ├── app.py                 # Flask API server
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx     # Navigation header
│   │   │   ├── Hero.jsx       # Hero section
│   │   │   ├── ImageUpload.jsx # Image upload component
│   │   │   ├── Results.jsx    # Results display
│   │   │   └── Footer.jsx     # Footer component
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── index.html             # HTML template
└── resnet50_tongue_augmented.pth  # Trained model weights
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
   ```powershell
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate
   ```

3. Install Python dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```powershell
   python app.py
   ```
   
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
   ```powershell
   cd frontend
   ```

2. Install Node dependencies:
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/predict` | POST | Analyze tongue image |
| `/api/prakriti-info` | GET | Get all Prakriti information |

### Example API Usage

```javascript
// Upload image for prediction
const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('/api/predict', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

## 🌈 Prakriti Types

| Type | Elements | Characteristics |
|------|----------|-----------------|
| **Vata** | Air & Space | Creative, energetic, quick-thinking |
| **Pitta** | Fire & Water | Intelligent, focused, ambitious |
| **Kapha** | Earth & Water | Calm, grounded, nurturing |

## 📸 Tips for Best Results

1. Take a clear, well-lit photo of your tongue
2. Stick out your tongue naturally
3. Use natural lighting when possible
4. Avoid taking photos right after eating

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Flask, Flask-CORS
- **ML**: PyTorch, torchvision, ResNet50
- **Image Processing**: Pillow

## 🚀 Deployment on Render

### Backend Deployment (Web Service)

1. Go to [Render Dashboard](https://dashboard.render.com) and sign up/login
2. Click **New +** → **Web Service**
3. Connect your GitHub repository: `ankitraj8042/Prakriti-Classification-ML-DL-Project`
4. Configure the service:
   - **Name**: `prakriti-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Free
5. Click **Create Web Service**
6. **Copy the deployed URL** (e.g., `https://prakriti-backend.onrender.com`) - you'll need this for the frontend

### Frontend Deployment (Static Site)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Static Site**
3. Connect your GitHub repository: `ankitraj8042/Prakriti-Classification-ML-DL-Project`
4. Configure the site:
   - **Name**: `prakriti-frontend` (or your choice)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add **Environment Variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL from step 6 (e.g., `https://prakriti-backend.onrender.com`)
6. Click **Create Static Site**

### Important Notes for Deployment

- ⏱️ The backend will sleep after 15 minutes of inactivity on free tier
- 🚀 First request after sleep may take 30-60 seconds
- 📦 Make sure the model file `resnet50_tongue_augmented.pth` is in the root directory
- 🔗 CORS is configured to accept requests from any origin

## ⚠️ Disclaimer

This application is for educational and informational purposes only. The AI-based analysis should not be considered as medical advice. Always consult a qualified Ayurvedic practitioner or healthcare professional for personalized health recommendations.

## 📄 License

This project is created for educational purposes as part of an ML course project.

---

Made with ❤️ for Ayurvedic wellness
