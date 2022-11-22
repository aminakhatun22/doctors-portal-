// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJseqUm3EZ4VyQG-Yb-eeP9ug8Y_Gihiw",
    authDomain: "doctors-portal-self.firebaseapp.com",
    projectId: "doctors-portal-self",
    storageBucket: "doctors-portal-self.appspot.com",
    messagingSenderId: "793799444579",
    appId: "1:793799444579:web:61323e07b363a7d20d9056"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;