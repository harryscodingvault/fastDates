import React from "react";
import "./Footer.css";

const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <p>Copyright © {thisYear} Harrys.one</p>
    </div>
  );
};

export default Footer;
