import React, { useState } from "react";
import "./Slider.scss";
import { sliderData } from "./slider-data";
import { Link } from "react-router-dom";

const Slider = () => {
  const dataLength = sliderData.length;
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : dataLength - 1);
    } else if (direction === "right") {
      setSlideIndex(slideIndex < dataLength - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <section className="slider">
      <i
        class="ri-arrow-left-s-fill"
        direction="left"
        onClick={() => handleClick("left")}
      ></i>
      <div
        className="slide__wrapper"
        style={{
          transform: `translateX(${slideIndex * -100}vw)`,
        }}
      >
        {sliderData.map((item, index) => (
          <div className="slide" key={index}>
            <div className="image">
              <img src={item.image} alt="" />
            </div>
            <div className="content">
              <p>{item.heading}</p>
              <h1>
                Make Yourself Stronger <br />
                Than Your Excuses
              </h1>
              <Link to="#plans">
                <button className="start-btn">Get Started</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <i
        class="ri-arrow-right-s-fill"
        direction="right"
        onClick={() => handleClick("right")}
      ></i>
    </section>
  );
};

export default Slider;
