import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMegjFThoL16D8bCet9fWPmwPwjtf9Rn8",
  authDomain: "dutydays-8be4d.firebaseapp.com",
  projectId: "dutydays-8be4d",
  storageBucket: "dutydays-8be4d.firebasestorage.app",
  messagingSenderId: "394683191065",
  appId: "1:394683191065:web:701fe528664454c328bf88",
  measurementId: "G-6JKFD0Y6PB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

if (import.meta.env.VITE_FIREBASE_EMULATOR === "true") {
  console.log("Connecting to Firestore emulator at 127.0.0.1:8080");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  console.log("Connecting to Auth emulator at 127.0.0.1:9099");
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
} else {
  console.log("Using production Firestore and Auth");
}

export { db, auth };