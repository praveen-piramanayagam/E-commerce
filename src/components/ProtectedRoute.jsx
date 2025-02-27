import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user"); // Check if user exists

  return user ? children : <Navigate to="/" replace />; // Redirect to "/" if not logged in
};

export default ProtectedRoute;
