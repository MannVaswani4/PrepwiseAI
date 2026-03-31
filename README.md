# PrepWise AI — AI-Powered Interview Preparation Platform

PrepWise AI is a complete ecosystem for candidates to prepare for technical and behavioral interviews using adaptive AI.

## 🏗️ Project Structure
- **/frontend**: Next.js 14+ application with a custom vanilla CSS design system.
- **/backend**: Node.js/Express API with Prisma ORM (PostgreSQL) and JWT authentication.
- **/ml-service**: Python/FastAPI microservice for answer scoring and qualitative evaluation.

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env` file in **both** `/backend` and `/ml-service`:
```env
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/prepwise
JWT_SECRET=your_jwt_secret
ML_SERVICE_URL=http://localhost:8000
```

### 2. Run the Services

#### Backend (Node.js)
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

#### ML Service (Python)
```bash
cd ml-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 train.py  # Trains the initial scoring model
uvicorn main:app --reload --port 8000
```

#### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## 🎙️ Core Features
- **Adaptive Questioning**: AI difficulty increases/decreases based on your performance.
- **Voice-to-Voice Interaction**: Seamless interaction using Whisper STT and OpenAI TTS.
- **Hybrid Evaluation**: Linguistic patterns analyzed by a custom ML model + LLM insights.
- **Analytics Dashboard**: Comprehensive breakdown of topic mastery and historical progress.

## 🛠️ Tech Stack
- **Frontend**: Next.js, Vanilla CSS, Web Audio API.
- **Backend**: Node.js, Express, Prisma, Multer.
- **AI/ML**: Python, FastAPI, Scikit-Learn, OpenAI (GPT-4o, Whisper).
- **Database**: PostgreSQL.
