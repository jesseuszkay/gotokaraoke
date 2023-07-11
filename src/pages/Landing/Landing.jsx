import { useEffect, useState } from "react";
import "./Landing.scss";
import { Link, useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = "../src/assets/hero.jpg";
    image.addEventListener("load", () => {
      setImageLoaded(true);
    });
  }, []);

  const handleEnterClick = () => {
    navigate("/home");
  };

  return (
    <div className="landing">
      <div className="landing__content">
        <div className="landing__title">
          <span className="landing__title landing__title--1">go</span>
          <span className="landing__title landing__title--2">to</span>
          <span className="landing__title landing__title--3">karaoke</span>
        </div>
        <div>
          {imageLoaded && (
            <div onClick={handleEnterClick} className="landing__button">
              Enter Site
            </div>
          )}
          <img
            src="../src/assets/hero.jpg"
            alt="Background"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
  ß;
}

export default Landing;
