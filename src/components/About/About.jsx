import React from "react";
import { Container } from "reactstrap";
import "./About.scss";
import aboutImg from "../../assets/images/about.jpg";

const About = () => {
  return (
    <section className="about" id="about">
      <Container>
        <div className="about__content">
          <div className="about__image">
            <img src={aboutImg} alt="" />
          </div>

          <div className="about__details">
            <p>About Us</p>
            <h1>
              Every Day Is A Chance To <br />
              Become Better
            </h1>
            <div className="categories">
              <div className="box">
                <h6>
                  <i class="ri-check-line"></i> body and mind{" "}
                </h6>
                <p>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                </p>
              </div>
              <div className="box">
                <h6>
                  <i class="ri-check-line"></i> body and mind{" "}
                  <p>
                    Lorem ipsum is placeholder text commonly used in the graphic
                  </p>
                </h6>
              </div>
              <div className="box">
                <h6>
                  <i class="ri-check-line"></i> body and mind{" "}
                </h6>
                <p>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                </p>
              </div>
              <div className="box">
                <h6>
                  <i class="ri-check-line"></i> body and mind{" "}
                </h6>
                <p>
                  Lorem ipsum is placeholder text commonly used in the graphic
                </p>
              </div>
            </div>
            <button className="start-btn">Learn more</button>
          </div>
        </div>
      </Container>
      <br />
    </section>
  );
};

export default About;
