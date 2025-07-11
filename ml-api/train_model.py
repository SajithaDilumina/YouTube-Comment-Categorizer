import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib

df = pd.read_csv('cyberbullying.csv')
print(df['cyberbullying_type'].value_counts())

x = df['tweet_text']
y = df['cyberbullying_type']

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

Pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english', max_df=0.9)),
    ('clf', LogisticRegression(max_iter=1000))
])

Pipeline.fit(x_train, y_train)

print("Model accuracy:", Pipeline.score(x_test, y_test))

joblib.dump(Pipeline, 'cyberbullying_model.pkl')

print("model train finished...")