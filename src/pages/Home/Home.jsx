import SongFinder from "../../components/SongFinder/SongFinder";
import AlbumGrid from "../../components/AlbumGrid/AlbumGrid";
import helpButton from "../../assets/icons/help.png";
import { useState, useEffect } from "react";
import "./Home.scss";
import HelpModal from "../../components/HelpModal/HelpModal";
import WelcomeModal from "../../components/WelcomeModal/WelcomeModal";

function Home({ isLoggedIn, userDetails, setUserDetails, apiURL }) {
  const [gridMode, setGridMode] = useState(false);
  const [welcome, setWelcome] = useState(true);
  const [help, setHelp] = useState(false);

  useEffect(() => {
    const seenWelcomeModal = sessionStorage.getItem("seenWelcomeModal");
    if (!seenWelcomeModal) {
      setWelcome(true);
      sessionStorage.setItem("seenWelcomeModal", true);
    }
  }, []);

  function handleClick(event) {
    if (event.target.value === "list") {
      setGridMode(false);
    }
    if (event.target.value === "grid") {
      setGridMode(true);
    }
  }

  function handleClick2() {
    setHelp(true);
  }

  if (isLoggedIn && !userDetails) {
    return <div className="home"></div>;
  }

  return (
    <div className="home">
      <div className="home__content">
        <img
          src={helpButton}
          alt="Help Button"
          className="home__help"
          onClick={handleClick2}
        />
        {help && <HelpModal help={help} setHelp={setHelp} />}
        {!sessionStorage.getItem("seenModal") && (
          <WelcomeModal welcome={welcome} setWelcome={setWelcome} />
        )}
        <div className="home__selects">
          <button
            className={
              !gridMode
                ? "home__select home__select-list home__select--selected"
                : "home__select home__select-list"
            }
            value="list"
            onClick={handleClick}
          >
            Song List
          </button>
          <button
            className={
              gridMode
                ? "home__select home__select-grid home__select--selected"
                : "home__select home__select-grid"
            }
            value="grid"
            onClick={handleClick}
          >
            Album Grid
          </button>
        </div>
        {gridMode && (
          <AlbumGrid
            apiURL={apiURL}
            isLoggedIn={isLoggedIn}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        )}
        {!gridMode && (
          <SongFinder
            isLoggedIn={isLoggedIn}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            apiURL={apiURL}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
