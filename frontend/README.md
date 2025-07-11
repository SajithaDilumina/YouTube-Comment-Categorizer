# YouTube Comment Categorizer

A full-stack web application that fetches YouTube video comments and analyzes them for cyberbullying using a machine learning model.

---

## Features

- Fetch comments from any public YouTube video using the YouTube Data API.
- Analyze comments to detect cyberbullying categories (e.g., ethnicity, gender, other types).
- Machine Learning model trained with TF-IDF and Logistic Regression on a Twitter cyberbullying dataset.
- Flask REST API to serve prediction results.
- Next.js frontend for user interaction with real-time analysis display.

---

## Tech Stack

- **Frontend:** Next.js, React
- **Backend:** Flask (Python)
- **Machine Learning:** Scikit-learn (TF-IDF + Logistic Regression)
- **APIs:** YouTube Data API
- **Others:** Axios, Flask-CORS

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- A valid YouTube Data API key

---

### Backend Setup

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Create and activate a Python virtual environment:

    ```bash
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```

3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Create a `.env` file in the backend folder with your API key (do **not** commit this file):

    ```env
    YOUTUBE_API_KEY=your_api_key_here
    ```

5. Run the Flask server:

    ```bash
    python app.py
    ```

---

### Frontend Setup

1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install Node.js dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- Paste a YouTube video URL into the input field.
- Click **Analyze** to fetch comments and view cyberbullying categorizations and confidence scores.

---

## Project Structure

