import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const adminEmail = `admin.${email}`; // Add prefix to avoid conflict

      const res = await createUserWithEmailAndPassword(auth, adminEmail, password);
      const uid = res.user.email;

      // Save to Firestore
      await setDoc(doc(db, "admins", uid), {
        name,
        email: email,
        mobilenumber,
        createdAt: serverTimestamp(),
      });

      await auth.signOut();

// ✅ Redirect to login page
navigate("/login");

      console.log("Admin registered:", adminEmail);
    } catch (err) {
      console.error("Registration error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2>Register Admin</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobilenumber}
          onChange={(e) => setMobileNumber(e.target.value)}
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
          <p>Already have an account?{" "}
            <a href="/login" style={styles.link}>Login</a>
          </p>
        </div>
        <button type="submit" style={styles.button}>
          Register
        </button>
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
    backgroundColor: "#f8f9fa",
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

export default Register;
