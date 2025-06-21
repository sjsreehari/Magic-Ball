# Magic Ball - Learning Project

This project was created as a hands-on way to learn and practice several modern web development tools and APIs. The main goal was to build a beautiful, interactive Magic 8 Ball app with mystical AI-powered answers, while exploring the following technologies:

## 🛠️ Main Tools & Technologies Used

- **React**: For building the user interface and managing state with hooks and context.
- **Tailwind CSS**: For rapid, utility-first styling and responsive design.
- **Mistral AI API**: To generate mystical, AI-powered answers to user questions.
- **Web Audio API**: For custom sound effects and immersive audio feedback.
- **React Router**: For multi-page navigation and routing.

## ✨ What You Can Learn From This Project
- How to use React functional components, hooks, and context for state management.
- How to style modern UIs with Tailwind CSS and custom CSS modules.
- How to call external APIs (like Mistral AI) and handle async data.
- How to add sound effects and haptic feedback using browser APIs.
- How to structure a multi-page React app with React Router.

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

## 📚 Project Structure
- `src/components/` — UI components (MagicBall, AnswerModal, Gallery, etc.)
- `src/pages/` — Main app pages (Home, History, CharacterMode, etc.)
- `src/api.js` — Handles API calls and fallback answers
- `src/context/` — App-wide context and state
- `src/index.js` — App entry point

## 🧪 Features
- Ask questions and get mystical answers (AI or fallback)
- Animated, interactive magic ball
- Sound effects and haptic feedback
- Save and view question history
- Share answers with friends
- Modern, responsive UI with cosmic effects

## 📝 Why This Project?
This project was made to learn and practice:
- API integration (Mistral AI)
- Tailwind CSS for rapid UI
- React context and hooks
- Web Audio API for sound
- Building a multi-page React app

---

**Made for learning. May the cosmic forces guide your code!**
