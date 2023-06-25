import SongFinder from "../../components/SongFinder/SongFinder";
import AlbumGrid from "../../components/AlbumGrid/AlbumGrid";
import { useState } from "react";
import "./Home.scss";

function Home({ isLoggedIn, userDetails, setUserDetails }) {
  const [gridMode, setGridMode] = useState(false);

  function handleOnClick(event) {
    if (event.target.value === "list") {
      setGridMode(false);
    }
    if (event.target.value === "grid") {
      setGridMode(true);
    }
  }

  if (isLoggedIn && !userDetails) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="home">
      <div className="home__content">
        <div className="home__selects">
          <button
            className={
              !gridMode
                ? "home__select home__select-list home__select--selected"
                : "home__select home__select-list"
            }
            value="list"
            onClick={handleOnClick}
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
            onClick={handleOnClick}
          >
            Album Grid
          </button>
        </div>

        {gridMode && <AlbumGrid />}
        {!gridMode && (
          <SongFinder
            isLoggedIn={isLoggedIn}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
