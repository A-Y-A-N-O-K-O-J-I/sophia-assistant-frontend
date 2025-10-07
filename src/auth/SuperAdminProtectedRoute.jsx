import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function SuperAdminProtectedRoute({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const checkToken = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        return false;
      }

      const res = await axios.post(
        `${API_URL}/auth/check-token`, 
        {}, 
        { 
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (res.data.status === 200) {
        setUserRole(res.data.role); // store role
        return true;
      }
      return false;
    } catch (err) {
      if (err.response && (err.response.status === 400 || err.response.status === 403)) {
        return false;
      }
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        return false;
      }

      const res = await axios.post(
        `${API_URL}/auth/refresh-token`, 
        {}, 
        { 
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        }
      );

      if (res.data.status === 200) {
        // Store the new access token
        localStorage.setItem('accessToken', res.data.accessToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const verify = async () => {
      setIsChecking(true);

      let valid = await checkToken();
      if (!valid) {
        const refreshed = await refreshToken();
        if (refreshed) {
          valid = await checkToken();
        }
      }

      setIsAuthenticated(valid);
      setIsChecking(false);
    };

    verify();
  }, []);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // role-based redirects
  if (userRole && userRole !== "super-admin") {
    if (userRole === "user") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  return children;
}