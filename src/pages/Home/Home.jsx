import SongFinder from "../../components/SongFinder/SongFinder";
import AlbumGrid from "../../components/AlbumGrid/AlbumGrid";
import tunnel from "../../assets/tunnel.mp4";
import tunnelVertical from "../../assets/tunnel-vertical.mp4";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Home.scss";
import "../../components/WelcomeModal/WelcomeModal.scss";

function Home({ isLoggedIn, userDetails, setUserDetails, apiURL }) {
  const [gridMode, setGridMode] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const seenModal = sessionStorage.getItem("seenModal");
    if (!seenModal) {
      setOpen(true);
      sessionStorage.setItem("seenModal", true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("seenModal", true);
  };

  function handleOnClick(event) {
    if (event.target.value === "list") {
      setGridMode(false);
    }
    if (event.target.value === "grid") {
      setGridMode(true);
    }
  }

  if (isLoggedIn && !userDetails) {
    return <div className="App"></div>;
  }

  return (
    <div className="home">
      <div className="home__content">
        {!sessionStorage.getItem("seenModal") && (
          <Modal
            open={open}
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
              <div className="welcome-modal-box">
                <video
                  autoPlay
                  muted
                  loop
                  playsinline
                  className="video video--mobile"
                >
                  <source src={tunnelVertical} type="video/mp4" />
                </video>
                <video
                  autoPlay
                  muted
                  loop
                  playsinline
                  className="video video--desktop"
                >
                  <source src={tunnel} type="video/mp4" />
                </video>
                <IconButton
                  id="welcome-modal__close-button"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
                <div className="welcome-modal-text">
                  <Typography id="welcome-modal__title">
                    Welcome to gotokaraoke
                  </Typography>
                  <Typography id="welcome-modal__description">
                    Urgently need the perfect karaoke song? No problem! Use
                    gotokaraoke's expert Song Finder to search, filter, and
                    scroll through our curated karaoke tracks. Click on a song
                    title to open the SingKing Karaoke version on Youtube!
                  </Typography>
                  <Typography id="welcome-modal__description">
                    Got some time to prep for your next karaoke session? Create
                    an account to save your karaoke song picks so that they are
                    always ready when you need them.
                  </Typography>
                </div>
              </div>
            </Box>
          </Modal>
        )}
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
            apiURL={apiURL}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
