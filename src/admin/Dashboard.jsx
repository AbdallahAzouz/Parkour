import React from "react";
import { Col, Container, Row } from "reactstrap";

import "../styles/dashboard.scss";
import useGetData from "../custom-hooks/useGetData.js";

const Dashboard = () => {
  const { data: usersData } = useGetData("users");
  const { data: productsData } = useGetData("products");

  return (
    <>
      <section className="dashboard">
        <Container>
          <Row>
            <div className="dashboard__content">
              <Col className="lg-3">
                <div className="revenue__box">
                  <h5>Total Sales</h5>
                  <span>$700</span>
                </div>
              </Col>
              <Col className="lg-3">
                <div className="orders__box">
                  <h5>Total Orders</h5>
                  <span>$700</span>
                </div>
              </Col>
              <Col className="lg-3">
                <div className="products__box">
                  <h5>Total Products</h5>
                  <span>{productsData.length}</span>
                </div>
              </Col>
              <Col className="lg-3">
                <div className="users__box">
                  <h5>Total Users</h5>
                  <span>{usersData.length}</span>
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
