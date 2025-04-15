import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import your App component
import "./index.css"; // Import your global styles, if any

// This is where React app is rendered to the DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
