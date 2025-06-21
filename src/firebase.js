import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6X6wO2vMnqrzqkIxOJYbxuhqKOaAKiWQ",
  authDomain: "magicball-b83ca.firebaseapp.com",
  projectId: "magicball-b83ca",
  storageBucket: "magicball-b83ca.appspot.com",
  messagingSenderId: "139322759059",
  appId: "1:139322759059:web:83f6d0683f410604003a66",
  measurementId: "G-0CEZD0ZKL7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
