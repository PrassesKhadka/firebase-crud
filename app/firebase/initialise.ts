import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

export const db = getFirestore(app);
export const storage = getStorage(app);
