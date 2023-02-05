import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import useAuth from "../../custom-hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";
import "./Header.scss";
import { auth } from "../../firebase.config";
import { motion } from "framer-motion";
import userIcon from "../../assets/images/user-icon.png";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setMenuToggle(!menuToggle);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };
  const profileActionRef = useRef(null);
  const { currentUser } = useAuth();
  console.log(currentUser);

  const navigate = useNavigate();
  const logOutUser = (e) => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully...");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle("show__profileActions");
  };

  return (
    <header className="header">
      {isLoading && <Loader />}
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <Link to="/">
                <h1>
                  {" "}
                  <span>Belal</span> Parkour
                </h1>
              </Link>
            </div>

            <div className="mobile__menu" onClick={toggleMenu}>
              {showMenu ? (
                <i class="ri-close-line"></i>
              ) : (
                <i class="ri-menu-line"></i>
              )}
            </div>

            <nav
              onClick={closeMenu}
              className={showMenu ? "show-menu" : "hide-menu"}
            >
              <ul className="menu">
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="about">
                  <li>About</li>
                </Link>
                <Link to="/contact">
                  <li>Contact Us</li>
                </Link>
                <Link to="plans">
                  <li>Pricing</li>
                </Link>
                <Link to="shop">
                  <li>Shop</li>
                </Link>
                <li>More</li>

                <li className="profile">
                  <span>
                    {currentUser && "Welcome, " + currentUser.displayName}
                  </span>{" "}
                  <span
                    className="profile__actions"
                    ref={profileActionRef}
                    onClick={toggleProfileActions}
                  >
                    {currentUser ? (
                      <Link to="/" onClick={logOutUser}>
                        Logout
                      </Link>
                    ) : (
                      <span>
                        <Link to="/login">Login</Link>
                      </span>
                    )}
                  </span>
                </li>

                <Link to="cart">
                  <li>
                    <i class="ri-shopping-bag-line"></i>
                    <span className="badge">{totalQuantity}</span>
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
