import React from "react";
import { Navigate } from "react-router-dom"; // Use Navigate instead of Redirect
import { useAuth } from "../context/AuthContext"; // Adjust the path to your AuthContext

const AuthRoute = ({ children }) => {
  const { adminuser } = useAuth(); // Use the context's `user` state to check if the user is logged in

  // If no user is authenticated, redirect to login page
  if (!adminuser) {
    return <Navigate to="/login" replace/>; // Redirect to the login page if the user is not authenticated
  }

  // If the user is authenticated, return the children (the protected route content)
  return children;
};

export default AuthRoute;
