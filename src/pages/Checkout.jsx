import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/commonSection/CommonSection";
import "../styles/Checkout.scss";
const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title=" checkout">
      <CommonSection title="Checkout" />
      <section className="checkout">
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Enter your name" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="Enter your email" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="number" placeholder="Enter your phone number" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Postal Code" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQty} item(s)</span>{" "}
                </h6>

                <h6>
                  SubTotal: <span>${totalAmount}</span>{" "}
                </h6>
                <h6>
                  Shipping: <br /> Free Shipping <span>$0</span>{" "}
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>{" "}
                </h4>
                <button className="start-btn mt-4 w-100">Place an order</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
