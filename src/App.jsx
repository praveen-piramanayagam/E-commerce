import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Nosuchpage from "./pages/Nosuchpage";
import Auth from "./pages/Auth";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/home" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Auth/>}/>
        <Route path="*" element={<Nosuchpage/>} />
      </Routes>
    </Router>
  );
}

export default App;
