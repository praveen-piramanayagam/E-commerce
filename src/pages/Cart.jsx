import React, { useState, useEffect } from 'react';
import Home from './Home';
import { useNavigate } from "react-router-dom"; // Import navigate


const Cart = ({ cart, setCart }) => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false); // State to track script loading
  const [paymentInProgress, setPaymentInProgress] = useState(false); // State to track payment initiation
  const navigate = useNavigate(); // Initialize navigate function


  // Dynamically load Razorpay script only once when the component mounts
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setIsRazorpayLoaded(true); // Set flag when script is loaded
      script.onerror = () => alert("Error loading Razorpay script.");
      document.body.appendChild(script);
    };

    if (!isRazorpayLoaded) {
      loadRazorpayScript(); // Load Razorpay script when component mounts
    }
  }, [isRazorpayLoaded]);

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cart.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = totalAmount * 0.1;
  const finalAmount = totalAmount - discount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Handle Pay Now button click
  const handlePayNow = () => {
    if (isRazorpayLoaded && !paymentInProgress) {
      setPaymentInProgress(true); // Prevent further clicks while payment is in progress
      initiatePayment(); // Trigger Razorpay payment UI
    }
  };

  // Handle Razorpay Payment UI
  const initiatePayment = () => {
    const options = {
      key: "rzp_test_9qlbqULX5I6dyn", // Replace with your Razorpay Test Key
      amount: Math.round(finalAmount * 100), // Convert to paise (smallest currency unit)
      currency: "INR",
      name: "E-Shopping",
      description: "Order Payment",
      handler: function (response) {
        console.log("Payment Successful", response);
        alert("Your order has been placed successfully.");
        window.location.reload();

      },
      prefill: {
        name: "Praveen",
        email: "Praveennayagam18@gmail.com",
        contact: "9384991464",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open(); // Open the Razorpay payment UI
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <>
            <p className="text-gray-600">Your cart is empty!!! Go to Home page for purchasing...</p>
            <button
              onClick={() => navigate("/home")} // ✅ Navigate to Home page
              className="bg-blue-500 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-4"
            >
              Go to Home
            </button>
          </>          
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                  <p className="text-sm text-gray-600">₹{item.price} x {item.quantity}</p>
                  <p className="text-sm font-bold text-gray-800">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="bg-green-400 text-white px-2 py-1 rounded-lg hover:bg-green-600"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="bg-green-400 text-white px-2 py-1 rounded-lg hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="border-t mt-6 pt-4">
              <h3 className="text-xl font-bold text-gray-800">Total Amount: {formatCurrency(totalAmount)}</h3>
              <h3 className="text-xl font-bold text-gray-800">Discount (10%): - {formatCurrency(discount)}</h3>
              <h3 className="text-xl font-bold text-gray-800">Final Amount: {formatCurrency(finalAmount)}</h3>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={handlePayNow}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-full"
            >
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
