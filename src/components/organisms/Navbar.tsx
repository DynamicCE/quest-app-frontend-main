import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>QuestApp</h1>
      <ul>
        <li>
          <Link to="/">Ana Sayfa</Link>
        </li>
        <li>
          <Link to="/login">Giriş/Kayıt</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
