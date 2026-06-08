import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeUMzz0o1kkKuml_tlHHPUirSQDsxlpao",
  authDomain: "sofia-15-b5c9a.firebaseapp.com",
  projectId: "sofia-15-b5c9a",
  storageBucket: "sofia-15-b5c9a.firebasestorage.app",
  messagingSenderId: "436725052394",
  appId: "1:436725052394:web:a33cb58f929c0e90923893"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);