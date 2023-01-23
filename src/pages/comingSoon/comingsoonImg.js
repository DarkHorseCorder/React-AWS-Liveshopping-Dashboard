import React, { Fragment } from "react";
import CountdownComponent from "./CountdownData";
import { Container } from "reactstrap";
const ComingsoonImg = (props) => {
  return (
    <Fragment>
      <div className="page-wrapper">
        {/* <!-- Page Body Start--> */}
        <Container fluid={true} className="p-0 m-0">
          <div className="comingsoon comingsoon-bgimg">
            <div className="comingsoon-inner text-center">
              <img src={require("../../assets/images/logo/logo.png")} alt="" />
              <h5>WE ARE COMING SOON</h5>
              <div className="countdown" id="clockdiv">
                <CountdownComponent />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default ComingsoonImg;
