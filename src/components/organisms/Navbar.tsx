import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  // Burada gerçek kullanıcı ID'sini almalısınız, şimdilik sabit bir değer kullanıyoruz
  const currentUserId = 1;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          QuestApp
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Ana Sayfa
            </Link>
          </li>
          <li className="nav-item">
            <Link to={`/profile/${currentUserId}`} className="nav-link">
              Profil
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
