import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Row } from "reactstrap";
import useAuth from "../custom-hooks/useAuth";
import "../styles/Admin-Nav.scss";

const AdminNav = () => {
  const { currentUser } = useAuth();
  const admin__nav = [
    {
      path: "/dashboard",
      display: "Dashboard",
    },
    {
      path: "/dashboard/all-products",
      display: "All-Products",
    },
    {
      path: "/dashboard/orders",
      display: "Orders",
    },
    {
      path: "/dashboard/users",
      display: "Users",
    },
    {
      path: "/dashboard/add-products",
      display: "Add-Products",
    },
  ];
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <Link to="/">
                <div className="logo">
                  <h2>Belal Parkour</h2>
                </div>
              </Link>
              <div className="search__box">
                <input placeholder="Search..." />
                <span>
                  <i
                    class="ri-search-line"
                    style={{
                      color: "black",
                      paddingRight: "1rem",
                      cursor: "pointer",
                    }}
                  ></i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i class="ri-notification-3-line"></i>
                </span>
                <span>
                  <i class="ri-settings-2-line"></i>
                </span>
                <img src={currentUser && currentUser.photoURL} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                      to={item.path}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
