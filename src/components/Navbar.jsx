import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart,Home } from "lucide-react";

const Navbar = ({ cart }) => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
      <button
          onClick={() => navigate("/")}
          className="text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Home size={24} />
        </button>
        <div className='text-white text-2xl font-bold tracking-wide'>
          DIGI Shopping
        </div>
        <button
          onClick={() => navigate("/cart")}
          className="relative flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
           <ShoppingCart size={24} /> &nbsp; ({totalItems})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
