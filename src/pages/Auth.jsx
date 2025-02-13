import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleLogin = () => {
    window.open("https://ecommerce-server-ki4x.onrender.com/auth/google", "_self"); // Redirect to backend OAuth
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Login to Continue</h1>
        <button
          onClick={handleLogin}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
