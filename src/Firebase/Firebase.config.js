// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// TODO:store the config in the .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  // apiKey: "AIzaSyDr_DSr57SLoRoZpGjVY1ZLmwRL8aA21_E",
  // authDomain: "bistro-resturent-dd90b.firebaseapp.com",
  // projectId: "bistro-resturent-dd90b",
  // storageBucket: "bistro-resturent-dd90b.appspot.com",
  // messagingSenderId: "952865139428",
  // appId: "1:952865139428:web:ae8248ca4377fbafa29af1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
