import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  // User session check
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://ecommerce-server-ki4x.onrender.com/profile", {
          credentials: "include", // Send session cookies with the request
        });
        if (!res.ok) {
          navigate("/login"); // If not authenticated, navigate to login
        } else {
          const data = await res.json();
          localStorage.setItem("user", JSON.stringify(data)); // Store user data
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login"); // If error occurs, navigate to login
      }
    };
    fetchUser();
  }, [navigate]);
  
  // Session timeout (set to 10 minutes)
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Logout after 10 minutes of inactivity
      localStorage.removeItem("user");
      navigate("/login");
    }, 10 * 60 * 1000); // 10 minutes timeout
  
    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, [navigate]);

  // Fetching product data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemIndex === -1) {
      setCart([...cart, { ...item, quantity: 1 }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      setCart(updatedCart);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h1 className="text-black text-xl font-bold text-center">Loading...</h1>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* 🔍 Search Bar */}
      <div className="flex justify-between max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />
        <button onClick={handleLogout} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>

      {/* 🛒 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const existingItem = cart.find((cartItem) => cartItem.id === product.id);
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl">
                <img src={product.image} alt={product.title} className="h-40 object-contain mb-4" />
                <h2 className="text-lg font-semibold text-gray-800 text-center line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 font-semibold mt-2">Price: ₹{product.price}</p>
                <p className="text-yellow-500 text-sm">⭐ {product.rating.rate.toFixed(1)}/5</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!!existingItem}
                  className={`px-4 py-2 mt-3 rounded-lg text-white transition ${
                    existingItem ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {existingItem ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
