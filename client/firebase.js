import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

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
const functions = getFunctions(app, "europe-north1");
const db = getFirestore(app);

console.log("VITE_FIREBASE_EMULATOR:", import.meta.env.VITE_FIREBASE_EMULATOR);
if (import.meta.env.VITE_FIREBASE_EMULATOR === "true") {
  console.log("Connecting to Functions emulator at 127.0.0.1:5001");
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  console.log("Connecting to Firestore emulator at 127.0.0.1:8080");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
} else {
  console.log("Using production Functions (europe-north1)");
}

export { functions, db };