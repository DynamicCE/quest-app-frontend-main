import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">QuestApp</h1>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Ana Sayfa
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Giriş/Kayıt
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
