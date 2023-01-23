import React, { Component } from "react";
import PropTypes from "prop-types";

import "./VideoPlayer.css";

class VideoPlayer extends Component {
  componentDidMount() {
    this.initVideo();
  }

  componentDidUpdate(prevProps) {
    // Change player src when props change
    if (this.props.videoStream !== prevProps.videoStream) {
      this.player.src(this.props.videoStream);
    }
  }

  componentWillUnmount() {
    this.destroyVideo();
  }

  destroyVideo() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }

  initVideo() {
    const videojs = window.videojs,
      registerIVSTech = window.registerIVSTech,
      registerIVSQualityPlugin = window.registerIVSQualityPlugin;
    if (registerIVSTech && registerIVSQualityPlugin) {
      registerIVSTech(videojs);
      registerIVSQualityPlugin(videojs);
    }

    const videoJsOptions = {
      techOrder: ["AmazonIVS"],
      autoplay: true,
      muted: this.props.muted,
      controlBar: {
        pictureInPictureToggle: false,
      },
    };

    // instantiate video.js
    this.player = videojs("amazon-ivs-videojs", videoJsOptions);
    this.player.ready(this.handlePlayerReady);
    // expose event for other components using it
    this.player.ready(this.props.onPlay);
    
  }

  handlePlayerReady = () => {
    this.player.enableIVSQualityPlugin();
    this.player.src(this.props.videoStream);
    this.player.play();
  };

  render() {
    return (
      <div className="video-container">
        <video
          id="amazon-ivs-videojs"
          className="video-js vjs-fluid vjs-big-play-centered"
          controls={this.props.controls}
          playsInline
          style={{paddingTop: "200%"}}
        ></video>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  videoStream: PropTypes.string,
  controls: PropTypes.bool,
  muted: PropTypes.bool,
  onPlay : PropTypes.func
};

export default VideoPlayer;
