// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsMGEulIHFqaVwQgsqp6QaYEgmso1Mkcs",
  authDomain: "flashcardsaas-9048b.firebaseapp.com",
  projectId: "flashcardsaas-9048b",
  storageBucket: "flashcardsaas-9048b.appspot.com",
  messagingSenderId: "660556297372",
  appId: "1:660556297372:web:75d240902b6c1c350da959",
  measurementId: "G-41N1DVKEDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}