import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import Loader from "../components/Loader/Loader";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import "../styles/AllProducts.scss";
import EditProduct from "./EditProduct";

const AllProducts = () => {
  const [editbox, setEditbox] = useState(false);
  const { data: productsData, isLoading } = useGetData("products");
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Product has been deleted...");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <Loader />
                ) : (
                  productsData?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>$ {item.price}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(item.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{
                            marginLeft: "10px",
                          }}
                          onClick={() => setEditbox(!editbox)}
                        >
                          Edit
                        </button>
                        {editbox === true && <EditProduct item={item} />}
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

export default AllProducts;
