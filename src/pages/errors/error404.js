import React, { Fragment } from "react";
import sad from "../../assets/images/other-images/sad.png";
import { Link } from "react-router-dom";
import { Container, Button, Media, Col } from "reactstrap";

const Error404 = () => {
  return (
    <Fragment>
      <div className="page-wrapper">
        {/* <!-- error-404 start--> */}
        <div className="error-wrapper">
          <Container>
            <Media body className="img-100" src={sad} alt="" />
            <div className="error-heading">
              <h2 className="headline font-danger">404</h2>
            </div>
            <Col md="8 offset-md-2">
              <p className="sub-content">
                The page you are attempting to reach is currently not available.
                This may be because the page does not exist or has been moved.
              </p>
            </Col>
            <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
              <Button color="danger-gradien" size="lg">
                BACK TO HOME PAGE
              </Button>
            </Link>
          </Container>
        </div>
        {/* <!-- error-404 end--> */}
      </div>
    </Fragment>
  );
};

export default Error404;
