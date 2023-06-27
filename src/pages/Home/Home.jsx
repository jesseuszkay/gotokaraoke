import SongFinder from "../../components/SongFinder/SongFinder";
import AlbumGrid from "../../components/AlbumGrid/AlbumGrid";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Home.scss";
import "../../components/WelcomeModal/WelcomeModal.scss";

function Home({ isLoggedIn, userDetails, setUserDetails }) {
  const [gridMode, setGridMode] = useState(false);
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            // Added inline styling to override the default border
            border: "none",
          }}
        >
          <Box
            id="welcome-modal"
            sx={{
              // Added inline styling to override the default border
              border: "none",
            }}
          >
            <Typography id="modal-modal-title">
              Welcome to gotokaraoke
            </Typography>
            <Typography id="modal-modal-description">
              Urgently need the perfect karaoke song? No problem! Use
              gotokaraoke's expert Song Finder to search, filter, and scroll
              through curated karaoke tracks. Got some time to prep for your
              next karaoke session? Create an account to save your karaoke song
              picks so that they are always ready when you need them.
            </Typography>
          </Box>
        </Modal>
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
