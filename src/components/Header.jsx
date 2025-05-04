import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { adminuser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoginOrRegisterPage = ["/login", "/register"].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleHome}>DigiGoldPay Admin's Panel</div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Logout (Desktop Only) */}
        {!isLoginOrRegisterPage && adminuser && (
          <div className="logout-desktop">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {/* Mobile Dropdown Menu */}
        {menuOpen && adminuser && !isLoginOrRegisterPage && (
          <div className="mobile-menu">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
