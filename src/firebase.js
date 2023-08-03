import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDs_ntmezSpSWQ4Wk-J6MhjAG3Ve3gKV4Q",
  authDomain: "react-chat-b7837.firebaseapp.com",
  projectId: "react-chat-b7837",
  storageBucket: "react-chat-b7837.appspot.com",
  messagingSenderId: "182347093288",
  appId: "1:182347093288:web:31ca438577848c615fec1d",
  measurementId: "G-2XR3YW3N5R"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);


const analytics = getAnalytics(app);