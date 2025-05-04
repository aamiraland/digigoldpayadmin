import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const adminEmail = `admin.${email}`;
      const userCredential = await signInWithEmailAndPassword(auth, adminEmail, password);
  
      // ✅ Update the context with logged-in user
      login(userCredential.user);
  
      // Store login time in localStorage for auto logout after 6 hours
      const currentTime = Date.now();
      localStorage.setItem("loginTime", currentTime);
      localStorage.setItem("isLoggedIn", "true"); // Mark user as logged in
  
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login error:", err);
    }
  };
  

  return (
    <div style={styles.container}>
      <form  style={styles.form}>
        <h2>Admin Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <div style={styles.footer}>
          <p>Don't have an account?{" "}
            <a href="/register" style={styles.link}>Create Account</a>
          </p>
        </div>

        <button type="submit" style={styles.button} onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  form: {
    width: "300px",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
  footer: {
    textAlign: "center",
  },
  link: {
    color: "blue",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default AdminLogin;
