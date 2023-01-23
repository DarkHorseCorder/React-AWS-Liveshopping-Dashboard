import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import man from "../assets/images/dashboard/user.png";
import app, {
  googleProvider,
  facebookProvider,
  twitterProvider,
  githubProvider,
} from "../data/base";

const Signin = (props) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123");
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(
    localStorage.getItem("Name") || "Elana Saint"
  );
  const [isuser, setisuser] = useState(localStorage.getItem("isUser") || true);

  useEffect(() => {
    localStorage.setItem("profileURL", value);
    localStorage.setItem("Name", name);
    localStorage.setItem("isUser", isuser);
    // eslint-disable-next-line
  }, [value, name, isuser]);

  const loginAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      setValue(man);
      setName("Elana Saint");
      setisuser("true");
      props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };
  const googleAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(googleProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName(result.user.displayName);
          setisuser("true");
          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };

  const facebookAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(facebookProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName(result.user.displayName);
          setisuser("true");
          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };
  const twitterAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(twitterProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName(result.user.displayName);
          setisuser("true");
          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };

  const githubAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(githubProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName("Hardik Parmar");
          setisuser("true");
          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };

  return (
    <div className="page-wrapper">
      <Container fluid={true} className="p-0">
        {/*  <!-- login page start--> */}
        <div className="authentication-main m-0 only-login">
          <Row>
            <Col md="12">
              <div className="auth-innerright">
                <div className="authentication-box">
                  <CardBody className="h-100-d-center">
                    <div className="cont text-center b-light">
                      <div>
                        <Form className="theme-form">
                          <h4>LOGIN</h4>
                          <h6>Enter your Username and Password</h6>
                          <FormGroup>
                            <Label className="col-form-label pt-0">
                              Your Name
                            </Label>
                            <Input
                              className="form-control"
                              type="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email address"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="col-form-label">Password</Label>
                            <Input
                              className="form-control"
                              type="password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </FormGroup>
                          <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label for="checkbox1">Remember me</Label>
                          </div>
                          <FormGroup className="form-row mt-3 mb-0">
                            {loading ? (
                              <Button
                                color="primary btn-block"
                                disabled={loading}
                              >
                                LOADING...
                              </Button>
                            ) : (
                              <Button
                                color="primary btn-block"
                                onClick={(event) => loginAuth(event)}
                              >
                                LOGIN
                              </Button>
                            )}
                          </FormGroup>
                          <div className="login-divider"></div>
                          <div className="social mt-3">
                            <Row form className="btn-showcase">
                              <Col md="3" sm="6">
                                <Button
                                  color="social-btn btn-fb"
                                  onClick={facebookAuth}
                                >
                                  Facebook
                                </Button>
                              </Col>
                              <Col md="3" sm="6">
                                <Button
                                  color="social-btn btn-twitter"
                                  onClick={twitterAuth}
                                >
                                  Twitter
                                </Button>
                              </Col>
                              <Col md="3" sm="6">
                                <Button
                                  color="social-btn btn-google"
                                  onClick={googleAuth}
                                >
                                  Google +{" "}
                                </Button>
                              </Col>
                              <Col md="3" sm="6">
                                <Button
                                  color="social-btn btn-github"
                                  onClick={githubAuth}
                                  style={{
                                    backgroundColor: "#8d6e63",
                                    color: "#fff",
                                  }}
                                >
                                  Github
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Form>
                      </div>
                      <div className="sub-cont">
                        <div className="img">
                          <div className="img__text m--up">
                            <h2>New User?</h2>
                            <p>
                              Sign up and discover great amount of new
                              opportunities!
                            </p>
                          </div>
                          <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>
                              If you already has an account, just sign in. We've
                              missed you!
                            </p>
                          </div>
                          <div className="img__btn">
                            <span className="m--up">Sign up</span>
                            <span className="m--in">Sign in</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <ToastContainer />
        {/* <!-- login page end--> */}
      </Container>
    </div>
  );
};

export default Signin;
