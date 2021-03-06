// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfSm8OxOIIpg2IrQJFQ-ryGbYmRenPsZo",
  authDomain: "chatt-box-mini-project.firebaseapp.com",
  databaseURL: "https://chatt-box-mini-project-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "chatt-box-mini-project",
  storageBucket: "chatt-box-mini-project.appspot.com",
  messagingSenderId: "573299552249",
  appId: "1:573299552249:web:f3a4b73f0423ea44341728"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);