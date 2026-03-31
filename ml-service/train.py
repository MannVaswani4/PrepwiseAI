import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

def train_model():
    try:
        df = pd.read_csv("dataset.csv")
    except FileNotFoundError:
        print("dataset.csv not found. Please run generate_data.py first.")
        return

    # For simplicity in this MVP, we treat it as a classification task: Poor, Average, Good
    # or we can use Ridge to predict the score. Let's do classification for labels.
    X = df["text"]
    y = df["label"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(stop_words='english', max_features=5000)),
        ('clf', LogisticRegression(max_iter=1000))
    ])

    pipeline.fit(X_train, y_train)

    # Evaluate
    y_pred = pipeline.predict(X_test)
    print(classification_report(y_test, y_pred))

    # Save model
    joblib.dump(pipeline, "model.joblib")
    print("Model saved to model.joblib")

if __name__ == "__main__":
    train_model()
