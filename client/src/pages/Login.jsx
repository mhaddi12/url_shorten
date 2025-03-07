import React, { useState } from "react";
import TextField from "../components/TextField.jsx";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  // Individual state variables
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    // Reset previous errors

    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful");
        console.log(data.token);
      } else {
        throw new Error(data.message || "Signup failed");
      }

      console.log(response.status);

      // Reset form on success

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-500 text-sm text-center mt-4">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
