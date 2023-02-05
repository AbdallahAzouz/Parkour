import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/commonSection/CommonSection";
import ProductList from "../components/productList/ProductList";
import products from "../assets/data/products";
// import useGetData from "../custom-hooks/useGetData.js";
import "../styles/Shop.scss";

const Shop = () => {
  // const { data: products, isLoading } = useGetData("products");
  // console.log(products);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    //Trending Products
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );
    setTrendingProducts(filteredTrendingProducts);
    //Best Sales Products
    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );
    setBestSalesProducts(filteredBestSalesProducts);
    // New Arrivals
    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );
    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    // Popular Products
    const filteredPopularProducts = products.filter(
      (item) => item.category === "watch"
    );
    setPopularProducts(filteredPopularProducts);
  }, []);
  const [productsData, setProductsData] = useState(products);
  const filterProductCat = products.map((product) => product.category);
  const uniqueCat = [...new Set(filterProductCat)];
  // console.log(uniqueCat);

  const handleFilter = (e) => {
    const filteredValue = e.target.value;
    // eslint-disable-next-line no-lone-blocks
    {
      for (let i = 0; i < uniqueCat.length; i++) {
        const element = uniqueCat[i];

        if (filteredValue === element) {
          const filteredProducts = products.filter(
            (item) => item.category === element
          );
          setProductsData(filteredProducts);
        }
      }
    }
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  return (
    <Helmet title=" shop">
      <CommonSection title="shop" />
      <Container>
        <Row>
          <div className="filter">
            <Col lg="3" md="6">
              <div className="filter-widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="">
              <div className="filter-widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="search__box">
                <input type="" placeholder="Search" onChange={handleSearch} />
                <i class="ri-search-line"></i>
              </div>
            </Col>
          </div>
        </Row>

        <section>
          <Container>
            <Row>
              {productsData.length === 0 ? (
                <h1 className="text-center fs-4  ">No Products Are Found!</h1>
              ) : (
                <ProductList data={productsData} />
              )}
            </Row>
          </Container>
        </section>
      </Container>
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
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            <ProductList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            <ProductList data={mobileProducts} />
            <ProductList data={wirelessProducts} />
          </Row>
        </Container>
      </section>
      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular in Category</h2>
            </Col>
            <ProductList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
