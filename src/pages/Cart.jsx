import React from "react";
import "../styles/Cart.scss";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/commonSection/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions, decrement, increment } from "../redux/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  console.log(cartItems);
  console.log(subtotal);
  console.log(totalQuantity);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteProduct = (id) => {
    dispatch(cartActions.deleteItem(id));
  };
  const incQty = (id) => {
    dispatch(increment(id));
  };
  const decQty = (id) => {
    dispatch(decrement(id));
  };
  const checkoutInfo = () => {
    subtotal !== 0 ? navigate("/checkout") : toast.error("Your Cart Is Empty!");
  };

  return (
    <Helmet title=" cart">
      <CommonSection title="Your Shopping Bag" />
      <br />
      <section className="cart">
        <Container>
          <Row>
            <Col>
              {cartItems.length === 0 ? (
                <h2 className="fs-2 text-center d-flex align-content-center">
                  No Products Added To Cart
                </h2>
              ) : (
                <table className="table bordered center">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <motion.img
                            whileHover={{ scale: 1.5 }}
                            src={item.img}
                            alt=""
                          />
                        </td>
                        <td>{item.productName}</td>
                        <td>$ {item.totalPrice} </td>
                        <td>
                          <div className="product__quantity">
                            <button className="quantity-btn">
                              <i
                                class="ri-subtract-line"
                                onClick={() => decQty(item.id)}
                              ></i>
                            </button>
                            {item.quantity}
                            <button className="quantity-btn">
                              <i
                                class="ri-add-line"
                                onClick={() => incQty(item.id)}
                              ></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <i
                            class="ri-delete-bin-line"
                            onClick={() => deleteProduct(item.id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  SubTotal
                  <span className="fw-bold fs-4">$ {subtotal}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                Taxes and Shipping Will Calculate in Checkout
              </p>
              <div>
                <Link to="/shop">
                  <button className="start-btn mt-3 w-100 fs-0 p-0">
                    Continue Shopping
                  </button>
                </Link>

                <button className="start-btn w-100 p-0" onClick={checkoutInfo}>
                  Checkout
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
