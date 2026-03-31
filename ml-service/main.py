import os
import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

app = FastAPI(title="PrepWise ML Evaluation Service")
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key else None

# Load model
model_path = "model.joblib"
model = None
if os.path.exists(model_path):
    model = joblib.load(model_path)

class EvaluationRequest(BaseModel):
    question: str
    answer: str
    role: str

class EvaluationResponse(BaseModel):
    ml_score: float
    label: str
    llm_feedback: str

@app.post("/evaluate", response_model=EvaluationResponse)
async def evaluate_answer(request: EvaluationRequest):
    # 1. Custom ML Scoring
    if model:
        prediction = model.predict([request.answer])[0]
        # Map label to a rough score for the MVP
        score_map = {"Good": 9.0, "Average": 6.0, "Poor": 3.0}
        ml_score = score_map.get(prediction, 5.0)
    else:
        prediction = "Model not trained"
        ml_score = 0.0

    # 2. LLM Qualitative Feedback
    llm_feedback = "Please provide an OpenAI API key for real feedback."
    if client and os.getenv("OPENAI_API_KEY"):
        try:
            prompt = f"""
            Role: {request.role}
            Question: {request.question}
            Answer: {request.answer}
            
            Provide a short, constructive critique of this interview answer. 
            Mention technical accuracy and communication style.
            """
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}]
            )
            llm_feedback = response.choices[0].message.content
        except Exception as e:
            llm_feedback = f"LLM Error: {str(e)}"

    return EvaluationResponse(
        ml_score=ml_score,
        label=prediction,
        llm_feedback=llm_feedback
    )

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ML Service", "model_loaded": model is not None}
