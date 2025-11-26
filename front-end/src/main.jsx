import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "apikey here",
  authDomain: "react-first-e07dd.firebaseapp.com",
  projectId: "react-first-e07dd",
  storageBucket: "react-first-e07dd.firebasestorage.app",
  messagingSenderId: "587897836984",
  appId: "1:587897836984:web:61a390509b18ec4edbab4d",
};

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
