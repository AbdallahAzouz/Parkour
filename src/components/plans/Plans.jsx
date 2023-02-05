import React from "react";
import { plansData } from "./PlansData";
import "./Plans.scss";
import { Container, Row } from "reactstrap";

const Plans = () => {
  return (
    <section className="plans" id="#plans">
      <Container>
        <Row>
          <h3>
            Ready To Start <span>Your Journey</span> With Us
          </h3>
        </Row>
        {/* Plans Card */}

        <div className="plans__categories">
          {plansData.map((plan, id) => (
            <div className="plan" key={id}>
              <span>{plan.icon}</span>
              <span className="title">{plan.name}</span>
              <span className="price">
                $ <h2>{plan.price}</h2>/Month
              </span>
              <div className="features">
                {plan.features.map((feature) => (
                  <div className="feature">
                    <span key={1}>{feature}</span>
                  </div>
                ))}
              </div>
              <div>
                <span>See more benefits -{">"} </span>
              </div>
              <button className="start-btn">Join now</button>
            </div>
          ))}
        </div>
        <br />
        <br />
      </Container>
    </section>
  );
};

export default Plans;
