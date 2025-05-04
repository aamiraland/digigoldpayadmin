import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebase"; // make sure you import your Firebase config
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminuser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and handle auto-logout after 6 hours
    const loginTime = localStorage.getItem("loginTime");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If login exists and the login time is more than 6 hours ago, logout the user
    if (isLoggedIn && loginTime) {
      const timeDiff = Date.now() - loginTime;
      if (timeDiff > 6 * 60 * 60 * 1000) { // 6 hours in milliseconds
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loginTime");
        logout(); // Log out the user if session has expired
      }
    }

    // Listen for auth state changes (for initial login/logout)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Store login time and mark user as logged in
        localStorage.setItem("loginTime", Date.now());
        localStorage.setItem("isLoggedIn", "true");
      } else {
        setUser(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loginTime");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("loginTime", Date.now());
    localStorage.setItem("isLoggedIn", "true"); // Mark user as logged in
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginTime"); // Remove login data on logout
  };

  // If loading, don't render children until auth state is resolved
  return (
    <AuthContext.Provider value={{ adminuser, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
