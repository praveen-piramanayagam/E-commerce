import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Nosuchpage from "./pages/Nosuchpage";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Auth />} />

        {/* Protected Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home cart={cart} setCart={setCart} />
          </ProtectedRoute>
        }
        />
        <Route path="/cart" element={
            <ProtectedRoute>
              <Cart cart={cart} setCart={setCart} />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for invalid URLs */}
        <Route path="*" element={<Nosuchpage />} />
      </Routes>
    </Router>
  );
}

export default App;
