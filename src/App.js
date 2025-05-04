import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";  // The protected dashboard
import AuthRoute from "./components/AuthRoute";  // Import the AuthRoute component
import { AuthProvider } from "./context/AuthContext"; // Ensure correct path
import Header from "./components/Header"; // Import the Header component
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import Transactions from "./components/Transactions";
import SIP from "./components/SIP";
import UserGold from "./components/UserGold";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Include the Header above the Routes so it shows on all pages */}
        <Header />
        
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protect the dashboard route */}
          <Route
            path="/"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/userlist"
            element={
              <AuthRoute>
                <UserList />
              </AuthRoute>
            }
          />
           <Route
             path="/userdetails/:id" 
            element={
              <AuthRoute>
                <UserDetails />
              </AuthRoute>
            }
          />
          <Route
             path="/transactions" 
            element={
              <AuthRoute>
                <Transactions />
              </AuthRoute>
            }
          />
           <Route
             path="/sip" 
            element={
              <AuthRoute>
                <SIP />
              </AuthRoute>
            }
          />
          <Route
             path="/usergold" 
            element={
              <AuthRoute>
                <UserGold />
              </AuthRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
