import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import Loader from "../components/Loader/Loader";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";

const Users = () => {
  const { data: usersData, isLoading } = useGetData("users");
  // console.log(productsData);
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("User has been deleted...");
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12">
            <table className="table bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <Loader />
                ) : (
                  usersData?.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          src={user.photoURL}
                          alt=""
                        />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
