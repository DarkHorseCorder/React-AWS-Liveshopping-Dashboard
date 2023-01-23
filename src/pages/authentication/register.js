import React from "react";
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
const Register = (props) => {
  const toggleform = () => {
    document.querySelector(".cont").classList.toggle("s--signup");
  };
  return (
    <div className="page-wrapper">
      <Container fluid={true} className="p-0">
        {/* <!-- login page start--> */}
        <div className="authentication-main">
          <Row>
            <Col md="12">
              <div className="auth-innerright">
                <div className="authentication-box">
                  <CardBody>
                    <div className="cont text-center s--signup">
                      <div>
                        <Form className="theme-form">
                          <h4>LOGIN</h4>
                          <h6>Enter your Username and Password</h6>
                          <FormGroup>
                            <Label className="col-form-label pt-0">
                              Your Name
                            </Label>
                            <Input
                              className="btn-pill"
                              type="text"
                              required=""
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="col-form-label">Password</Label>
                            <Input
                              className="btn-pill"
                              type="password"
                              required=""
                            />
                          </FormGroup>
                          <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label for="checkbox1">Remember me</Label>
                          </div>
                          <FormGroup className="form-row mt-3 mb-0">
                            <Button color="primary btn-block">LOGIN</Button>
                          </FormGroup>
                          <div className="login-divider"></div>
                          <div className="social mt-3">
                            <Row form className="btn-showcase">
                              <Col md="4" sm="6">
                                <Button color="social-btn btn-fb">
                                  Facebook
                                </Button>
                              </Col>
                              <Col md="4" sm="6">
                                <Button color="social-btn btn-twitter">
                                  Twitter
                                </Button>
                              </Col>
                              <Col md="4" sm="6">
                                <Button color="social-btn btn-google">
                                  Google +{" "}
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
                          <div className="img__btn" onClick={toggleform}>
                            <span className="m--up">Sign up</span>
                            <span className="m--in">Sign in</span>
                          </div>
                        </div>
                        <div>
                          <Form className="theme-form">
                            <h4 className="text-center">NEW USER</h4>
                            <h6 className="text-center">
                              Enter your Username and Password For Signup
                            </h6>
                            <Row form>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="btn-pill"
                                    type="text"
                                    placeholder="First Name"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="btn-pill"
                                    type="text"
                                    placeholder="Last Name"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup>
                              <Input
                                className="btn-pill"
                                type="text"
                                placeholder="User Name"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Input
                                className="btn-pill"
                                type="password"
                                placeholder="Password"
                              />
                            </FormGroup>
                            <Row form>
                              <Col sm="4">
                                <Button color="primary">Sign Up</Button>
                              </Col>
                              <Col sm="8">
                                <div className="text-left mt-2 m-l-20">
                                  Are you already user? 
                                  <a
                                    className="btn-link text-capitalize"
                                    href="login.html"
                                  >
                                    Login
                                  </a>
                                </div>
                              </Col>
                            </Row>
                            <div className="form-divider"></div>
                            <div className="social mt-3">
                              <div className="form-row btn-showcase">
                                <Col sm="4">
                                  <Button color="social-btn btn-fb">
                                    Facebook
                                  </Button>
                                </Col>
                                <Col sm="4">
                                  <Button color="social-btn btn-twitter">
                                    Twitter
                                  </Button>
                                </Col>
                                <Col sm="4">
                                  <Button color="social-btn btn-google">
                                    Google +
                                  </Button>
                                </Col>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* <!-- login page end--> */}
      </Container>
    </div>
  );
};

export default Register;
