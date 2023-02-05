import React, { useEffect, useState } from "react";

import About from "../components/About/About";
import Helmet from "../components/Helmet/Helmet";
import Join from "../components/join/Join";
import Plans from "../components/plans/Plans";
import Slider from "../components/slider/Slider";
import ProductList from "../components/productList/ProductList";
import products from "../assets/data/products";
import "../styles/Home.scss";
import { Col, Container, Row } from "reactstrap";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  useEffect(() => {
    //Trending Products
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );
    setTrendingProducts(filteredTrendingProducts);
  }, []);
  return (
    <Helmet title="Home">
      <div className="home">
        <Slider />
        <Plans />
        <section className="trending__products">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Trending Products</h2>
              </Col>
              <ProductList data={trendingProducts} />
            </Row>
          </Container>
        </section>
        <About />
        <Join />
      </div>
    </Helmet>
  );
};

export default Home;
