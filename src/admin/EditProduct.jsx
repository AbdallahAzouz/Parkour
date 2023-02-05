import React, { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { db, storage } from "../firebase.config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import Loader from "../components/Loader/Loader.jsx";
import "../styles/AddProducts.scss";
import { useNavigate } from "react-router-dom";

const AddProducts = ({ item }) => {
  //   console.log(item);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const editProduct = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    // Add Product to firebase database
    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + productImage.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, productImage);
      uploadTask.on(
        () => {
          toast.error("Images cannot be uploaded!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "products", id), {
              title,
              shortDesc,
              desc,
              price,
              category,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setIsLoading(false);
      toast.success("Product is Edited Successfuly");
      navigate("/dashboard/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }

    // console.log(product);
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {isLoading && <Loader />}

            <Form onSubmit={editProduct}>
              <FormGroup className="d-flex flex-column">
                <span style={{ color: "red" }}>Product Title</span>
                <input
                  type="text"
                  placeholder="title..."
                  className="p-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="d-flex flex-column">
                <span style={{ color: "red" }}>Short Desc</span>
                <input
                  type="text"
                  placeholder="short desc..."
                  className="p-2"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="d-flex flex-column">
                <span style={{ color: "red" }}>Description</span>
                <input
                  type="text"
                  placeholder="description...."
                  className="p-2"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </FormGroup>
              <div className="d-flex justify-content-evenly">
                <FormGroup className="d-flex flex-column">
                  <span style={{ color: "red" }}>Price</span>
                  <input
                    type="number"
                    placeholder="$100"
                    className="p-2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                  <span style={{ color: "red" }}>Category</span>
                  <select
                    className="p-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option>Select category</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="chair">Chair</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>
              <div>
                <FormGroup className="d-flex flex-column">
                  <span style={{ color: "red" }}>Product Image</span>
                  <input
                    type="file"
                    className="p-2"
                    onChange={(e) => setProductImage(e.target.files[0])}
                    required
                  />
                </FormGroup>
              </div>
              <button type="submit" className="start-btn">
                Edit Product
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
