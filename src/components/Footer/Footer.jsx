import React from "react";
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <section className="footer">
      <div className="social__icons">
        <i class="ri-instagram-line"></i>
        <i class="ri-facebook-line"></i>
        <i class="ri-youtube-line"></i>
      </div>
      <p> © {year}, Abdallah Azouz</p>
    </section>
  );
};

export default Footer;
