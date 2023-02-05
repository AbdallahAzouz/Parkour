import React from "react";
import "./Contact.scss";
import { Container, Row } from "reactstrap";

const Contact = () => {
  return (
    <section className="contact">
      <Container>
        <Row>
          <h2 className="contact__heading">Contact Us</h2>
          <form className="contact__wrapper">
            <label>Name</label>
            <input
              type="text"
              name="user_name"
              placeholder="Full Name"
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="Your active email"
              required
            />
            <label>Subject</label>
            <input type="text" name="subject" placeholder="Subject" required />
            <label>Message</label>
            <textarea name="message" cols="30" rows="10"></textarea>
            <button className="start-btn">Send Message</button>
          </form>

          <div className="additional__info">
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>
            <div className="social__media">
              <span>
                <i class="ri-phone-line"></i>
                <p>+234 705 141 6545</p>
              </span>
              <span>
                <i class="ri-mail-line"></i>
                <p>Azouz@Parkour.com</p>
              </span>
              <span>
                <i class="ri-map-pin-2-line"></i>
                <p>cairo, Egypt</p>
              </span>
              <span>
                <i class="ri-twitter-line"></i>
                <p>@Azouz</p>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
