import "./Landing.scss";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <div className="landing__content">
        <div className="landing__title">
          <span className="landing__title landing__title--1">go</span>
          <span className="landing__title landing__title--2">to</span>
          <span className="landing__title landing__title--3">karaoke</span>
        </div>
        <Link to="/home" className="landing__button">
          ENTER SITE
        </Link>
      </div>
    </div>
  );
}

export default Landing;
