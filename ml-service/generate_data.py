import os
import json
import pandas as pd
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_synthetic_answers():
    roles = ["Software Engineer", "Product Manager", "AI Engineer", "Data Scientist", "System Architect"]
    questions = [
        "Tell me about a challenging project you worked on.",
        "How do you handle conflict in a team?",
        "Explain the concept of decorators in Python.",
        "What is your approach to system design?",
        "How do you stay updated with the latest AI trends?",
        "Describe a time you failed and what you learned.",
        "Explain how you would scale a real-time messaging application.",
        "How do you prioritize competing product requirements?",
        "What is the difference between supervised and unsupervised learning?"
    ]
    
    data = []
    
    for role in roles:
        for q in questions:
            print(f"Generating for {role}: {q}")
            prompt = f"""
            Role: {role}
            Question: {q}
            
            Generate 4 types of answers:
            1. An 'Expert' answer (Score 9.5-10): Perfectly structured (STAR method), high technical depth, precise terminology.
            2. A 'Good' answer (Score 7.5-9): Clear, structured, good technical depth.
            3. An 'Average' answer (Score 4-7): Correct but lacks depth or structure.
            4. A 'Poor' answer (Score 0-3.5): Vague, incorrect, or extremely short.
            
            Return ONLY a JSON list of objects with keys: "text", "score", "label".
            "label" should be one of: "Poor", "Average", "Good", "Expert".
            """
            
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}]
            )
            
            try:
                content = response.choices[0].message.content
                # Strip markdown code blocks if present
                if "```json" in content:
                    content = content.split("```json")[1].split("```")[0]
                elif "```" in content:
                    content = content.split("```")[1].split("```")[0]
                
                answers = json.loads(content)
                for ans in answers:
                    ans["question"] = q
                    ans["role"] = role
                    data.append(ans)
            except Exception as e:
                print(f"Error parsing: {e}")
                
    df = pd.DataFrame(data)
    df.to_csv("dataset.csv", index=False)
    print("Dataset saved to dataset.csv")

if __name__ == "__main__":
    generate_synthetic_answers()
