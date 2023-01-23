import React, { Fragment, useState, useEffect } from "react";
import Countdown from "react-countdown";

const CountdownData = (props) => {
  // eslint-disable-next-line
  const [style, setStyle] = useState();
  useEffect(() => {
    setTimeout(function () {
      setStyle({ style: { display: "none" } });
    }, 1000);
  }, []);
  const Completionist = () => <span>You are good to go!</span>;

  const renderer = ({
    total,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    completed,
  }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div>
          <ul>
            <li>
              <span id="days" className="time digits">
                {days}
              </span>
              <span className="title">days</span>
            </li>
            <li>
              <span className="time digits" id="hours">
                {hours}
              </span>
              <span className="title">Hours</span>
            </li>
            <li>
              <span className="time digits" id="minutes">
                {minutes}
              </span>
              <span className="title">Minutes</span>
            </li>
            <li>
              <span className="time digits" id="seconds">
                {seconds}
              </span>
              <span className="title">Seconds</span>
            </li>
          </ul>
        </div>
      );
    }
  };

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var coundown = new Date(year, month, day + 10).getTime();

  return (
    <Fragment>
      <Countdown date={coundown} renderer={renderer} />
    </Fragment>
  );
};

export default CountdownData;
