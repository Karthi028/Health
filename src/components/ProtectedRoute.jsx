import { Navigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  // We use 3 states: null (loading), true (logged in), false (not logged in)
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Hit your 'me' endpoint to see if the cookie is valid
        await axios.get("https://healthcheck-nqw1.onrender.com/api/v1/auth/me", { withCredentials: true });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);  
      } 
    };
    checkAuth();
  }, []);

  // 1. While the API call is in progress, show a loading spinner
  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  // 2. If authenticated, show the component (Home, Profile, etc.)
  // 3. If NOT authenticated, redirect to registration
  return isAuthenticated ? children : <Navigate to="/register" replace />;
};

export default ProtectedRoute;