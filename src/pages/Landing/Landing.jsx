import { useEffect, useState } from "react";
import "./Landing.scss";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const getImagePath = () => {
    if (import.meta.env.VITE_APP_ENV === "development") {
      console.log("development");
      return "/../src/assets/hero.jpg";
    } else {
      return "/assets/hero-6dfe585f.jpg";
    }
  };

  useEffect(() => {
    const image = new Image();
    image.src = getImagePath();
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
            src={getImagePath()}
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
