import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyBGlwit2RaGVGcMi-bzDz-o19jBFdJdA",
  authDomain: "fir-crud-6aeba.firebaseapp.com",
  projectId: "fir-crud-6aeba",
  storageBucket: "fir-crud-6aeba.appspot.com",
  messagingSenderId: "433788425227",
  appId: "1:433788425227:web:a16aa320fdcefde3e6a30e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialise Authentication
export const authInit = getAuth(app);
// Get firestore ref
export const db = getFirestore(app);
// Get storage ref
export const storage = getStorage(app);
// Defining collection names
export type TcollectionName = "students";
export const collectionName: TcollectionName = "students";
