import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";

const AdminOnlyRoute = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser && currentUser.email === "user1@hotmail.com" ? (
    <Outlet />
  ) : (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export default AdminOnlyRoute;
