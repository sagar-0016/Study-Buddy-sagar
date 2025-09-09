
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// THIS IS THE SOURCE DATABASE
const firebaseConfigSource = {
  apiKey: "AIzaSyBv26GpTGNi56cOHY23H4JWk_Q0iu7WRbg",
  authDomain: "study-buddy-7357a.firebaseapp.com",
  projectId: "study-buddy-7357a",
  storageBucket: "study-buddy-7357a.firebasestorage.app",
  messagingSenderId: "286721031921",
  appId: "1:286721031921:web:bdebedc76dd6081dbfb350"
};

// Initialize a separate Firebase app for the source
const sourceApp = initializeApp(firebaseConfigSource, "source");
const sourceDb = getFirestore(sourceApp);

export { sourceDb };
