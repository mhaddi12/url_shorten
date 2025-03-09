import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginScreen from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token")); 
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Navigate to="/home" /> : <LoginScreen setToken={setToken} />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
