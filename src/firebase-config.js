
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJAuPJVH7-CoQGl617tyMmb6F-wuZt6Oo",
  authDomain: "employee-crud-58993.firebaseapp.com",
  projectId: "employee-crud-58993",
  storageBucket: "employee-crud-58993.appspot.com",
  messagingSenderId: "152628924761",
  appId: "1:152628924761:web:1c917b5d448160950bbc48"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);