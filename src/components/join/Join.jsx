import React from "react";
import "./Join.scss";

const Join = () => {
  return (
    <section className="join">
      <div className="join__content">
        <p>Join us Now</p>
        <h3>Get Up To 50% discount</h3>
        <span>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </span>
        <input placeholder="Enter your Email...." />
        <button className="start-btn">Get Discount</button>
      </div>
    </section>
  );
};

export default Join;
