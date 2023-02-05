import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { auth } from "../firebase.config";
import { db } from "../firebase.config";
import { storage } from "../firebase.config";
import Loader from "../components/Loader/Loader";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    if (username.length > 11) {
      toast.error("username is too long!");
    } else if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
    } else {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const storageRef = ref(storage, `images/${Date.now() + username}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            (err) => {
              toast.err(err.message);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadUrl) => {
                  await updateProfile(user, {
                    //update user profile
                    displayName: username,
                    photoURL: downloadUrl,
                  });
                  //store user data in firestore database
                  await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName: username,
                    email,
                    photoURL: downloadUrl,
                  });
                }
              );
            }
          );
          console.log(user);
          setIsLoading(false);
          toast.success("Registration Successful... ");
          navigate("/login");
        })

        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    }
  };
  return (
    <Helmet title=" Signup">
      {isLoading && <Loader />}
      <section className="auth">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3>Signup</h3>
              <Form className="auth__form" onSubmit={registerUser}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="file"
                    placeholder="Enter your password"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>
                <button className="start-btn" type="submit">
                  Create An Account
                </button>
                <p>
                  Already You Have Account ?<Link to="/login">Login</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
