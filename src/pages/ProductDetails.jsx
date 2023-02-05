import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { Col, Container, Row } from "reactstrap";
import "../styles/ProductDetails.scss";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/commonSection/CommonSection";
import ProductList from "../components/productList/ProductList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  // console.log(product);
  const {
    productName,
    imgUrl,
    category,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
  } = product;
  const relatedProducts = products.filter((item) => item.category === category);
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    console.log(reviewObj);
    toast.success("Thanks For Your Opinion");
  };
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        productName: productName,
        img: imgUrl,
        price: price,
      })
    );
    toast.success(`${productName} added to cart successfuly`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className=" pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details mt-5">
                <h2>{productName}</h2>
                <div className="product__rating">
                  <span>
                    <i class="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i class="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i class="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i class="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i class="ri-star-half-s-line"></i>
                  </span>
                  <p>
                    ( <span>{avgRating}</span> Ratings )
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">$ {price}</span>
                  <span>Category: {category.toUpperCase()}</span>
                </div>
                <p>{shortDesc}</p>
                <motion.button
                  onClick={addToCart}
                  whileTap={{ scale: "1.2" }}
                  className="start-btn"
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""} `}
                  onClick={() => setTab("rev")}
                >
                  Reviews({reviews.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="productreview">
                  <div className="review__wrapper">
                    <ul>
                      {reviews.map((review, index) => (
                        <li key={index}>
                          <h6>Abdallah Azouz</h6>
                          <span>{review.rating} (average rating) </span>
                          <p>{review.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <form onSubmit={submitHandler}>
                        <h4>Leave Your Experience</h4>
                        <div className="form__group">
                          <input
                            placeholder="Enter Your Name..."
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group  d-flex align-items-center gap-5 border-0">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i class="ri-star-s-fill"></i>
                          </motion.span>
                        </div>

                        <div className="form__group">
                          <textarea
                            placeholder="Review Message...."
                            rows={4}
                            ref={reviewMsg}
                            required
                          ></textarea>
                        </div>
                        <button type="submit" className="start-btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <br />
              <h2 className="related__title">You Might Also Like</h2>
            </Col>
            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
