import SongOfTheDay from "../../components/SongOfTheDay/SongOfTheDay";
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
      {/* <SongOfTheDay isLoggedIn={isLoggedIn} userDetails={userDetails} /> */}
      <div className="home__selects">
        <button
          className="home__select home__select-list"
          value="list"
          onClick={handleOnClick}
        >
          Song List
        </button>
        <button
          className="home__select home__select-grid"
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
  );
}

export default Home;
