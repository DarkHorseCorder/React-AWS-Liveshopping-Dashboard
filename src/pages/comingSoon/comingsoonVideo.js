import React, { Fragment } from "react";
import CountdownComponent from "./CountdownData";
import { Container } from "reactstrap";
import comingsoon from "../../assets/images/other-images/coming-soon-bg.jpg";
import authVideo from "../../assets/video/auth-bg.mp4";
const ComingsoonVideo = (props) => {
  return (
    <Fragment>
      <div className="page-wrapper">
        {/* <!-- Page Body Start--> */}
        <Container fluid={true} className="p-0">
          <div className="comingsoon auth-bg-video">
            <video
              id="bgvid"
              poster={comingsoon}
              playsInline=""
              autoPlay={true}
              muted=""
              loop=""
            >
              <source src={authVideo} type="video/mp4" />
            </video>
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

export default ComingsoonVideo;
