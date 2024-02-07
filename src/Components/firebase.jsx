import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SOME_API_KEY,
  projectId: import.meta.env.VITE_SOME_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SOME_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SOME_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_SOME_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const DB_STORAGE_PP_KEY = "profile-picture/";
