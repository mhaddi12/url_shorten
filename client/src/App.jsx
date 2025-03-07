import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
