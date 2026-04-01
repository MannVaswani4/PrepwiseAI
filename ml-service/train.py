import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression, ElasticNet
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, mean_squared_error

def train_model():
    try:
        df = pd.read_csv("dataset.csv")
    except FileNotFoundError:
        print("dataset.csv not found. Please run generate_data.py first.")
        return

    # We want TWO things:
    # 1. Classification (Poor/Average/Good/Expert)
    # 2. Regression (Score 0.0-10.0)
    
    # We'll save a dual model or just a regression model that can derive the label.
    # Let's train a Regression model for granular scoring.
    X = df["text"]
    y_score = df["score"]

    X_train, X_test, y_train, y_test = train_test_split(X, y_score, test_size=0.2, random_state=42)

    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(stop_words='english', max_features=5000, ngram_range=(1,2))),
        ('reg', ElasticNet(alpha=0.1, l1_ratio=0.5))
    ])

    pipeline.fit(X_train, y_train)

    # Evaluate
    y_pred = pipeline.predict(X_test)
    print(f"Mean Squared Error: {mean_squared_error(y_test, y_pred)}")

    # Save model
    joblib.dump(pipeline, "model.joblib")
    print("Model saved to model.joblib")

if __name__ == "__main__":
    train_model()
