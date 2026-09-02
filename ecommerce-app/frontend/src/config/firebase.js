import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyReplaceWithYoursIfNeeded",
  authDomain: "myreactauthapp-d4944.firebaseapp.com",
  projectId: "myreactauthapp-d4944",
  storageBucket: "myreactauthapp-d4944.appspot.com",
  messagingSenderId: "111013138095919124091",
  appId: "1:111013138095919124091:web:dummyAppId"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
