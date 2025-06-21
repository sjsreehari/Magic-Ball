# Magic Ball - Learning Project

This project is a modern Magic 8 Ball web app built to learn and practice:
- **React** (UI, hooks, context)
- **Tailwind CSS** (styling)
- **Firebase** (authentication, Firestore database)
- **Mistral AI API** (AI-powered answers)
- **Web Audio API** (sound effects)
- **React Router** (multi-page navigation)

## ✨ Features
- **Sign Up / Sign In** required to use the app (Google or Email)
- **Dark mode** by default for all users
- **Ask mystical questions** and get AI or fallback answers
- **Personal question history** and **planner** stored securely in Firestore, only accessible to you
- **Modern, responsive UI** with glassmorphism, gradients, and cosmic effects
- **Sound effects and haptic feedback**
- **Share answers** and view your own history

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Magic-Ball
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_MISTRAL_API_KEY=your_mistral_api_key_here
   ```
   (You can use the app without an API key for fallback mystical answers.)
4. **Start the development server**
   ```bash
   npm start
   ```
5. **Open your browser**
   Go to `http://localhost:3000`

## 🔒 Firebase Security
- All user data (history, planner) is stored in Firestore and only accessible to the signed-in user.
- Firestore rules:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
  ```

## 📚 Project Structure
- `src/components/` — UI components (MagicBall, AnswerModal, Gallery, SignUpPage, etc.)
- `src/pages/` — Main app pages (Home, History, MysticPlanner, etc.)
- `src/context/` — App-wide context and state
- `src/firebase.js` — Firebase initialization
- `src/api.js` — Handles AI API calls and fallback answers

---

**Made for learning. May the cosmic forces guide your code!**
