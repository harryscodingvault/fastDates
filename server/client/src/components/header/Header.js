import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div className="title" onClick={() => navigate("/")}>
        <h2>DatesLocal</h2>
      </div>

      <div className="header-nav" onClick={() => navigate("/login")}>
        <h5>Login</h5>
      </div>
    </div>
  );
};

export default Header;
