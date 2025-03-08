import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/home" /> : <LoginScreen />}
      />
      <Route path="/register" element={<Register />} />

      <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
