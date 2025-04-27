import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

let firebaseConfig;
try {
  firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
} catch (error) {
  console.error("Failed to parse VITE_FIREBASE_CONFIG:", error);
  throw new Error("Invalid Firebase configuration in .env");
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

if (import.meta.env.VITE_FIREBASE_EMULATOR === "true") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
} else {
  console.log("Using production Firestore and Auth");
}

export { db, auth };
