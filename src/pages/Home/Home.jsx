import SongFinder from "../../components/SongFinder/SongFinder";
import AlbumGrid from "../../components/AlbumGrid/AlbumGrid";
import helpButton from "../../assets/help.png";
import songList from "../../assets/help-modal-img/list.png";
import albumsGrid from "../../assets/help-modal-img/grid.png";
import songListAdd from "../../assets/help-modal-img/list-add.png";
import albumsGridAdd from "../../assets/help-modal-img/grid-add.png";
import mobileList from "../../assets/help-modal-img/list-mobile.png";
import mobileGrid from "../../assets/help-modal-img/grid-mobile.png";
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
import "../../components/HelpModal/HelpModal.scss";

function Home({ isLoggedIn, userDetails, setUserDetails, apiURL }) {
  const [gridMode, setGridMode] = useState(false);
  const [open, setOpen] = useState(true);
  const [help, setHelp] = useState(false);

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
  const handleClose2 = () => {
    setHelp(false);
  };

  function handleOnClick(event) {
    if (event.target.value === "list") {
      setGridMode(false);
    }
    if (event.target.value === "grid") {
      setGridMode(true);
    }
  }

  function handleOnClick2() {
    setHelp(true);
  }

  if (isLoggedIn && !userDetails) {
    return <div className="App"></div>;
  }

  return (
    <div className="home">
      <div className="home__content">
        <img
          src={helpButton}
          alt="Help Button"
          className="home__help"
          onClick={handleOnClick2}
        />
        {help && (
          <Modal
            open={help}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              // Added inline styling to override the default border
              border: "none",
            }}
          >
            <Box
              id="help-modal"
              sx={{
                // Added inline styling to override the default border
                border: "none",
              }}
            >
              <div className="help-modal-box">
                <IconButton
                  id="help-modal__close-button"
                  onClick={handleClose2}
                >
                  <CloseIcon />
                </IconButton>
                <div className="help-modal-text">
                  <Typography id="help-modal__title">
                    How to use gotokaraoke
                  </Typography>
                  <div className="help-modal-container">
                    <Typography id="help-modal__description">
                      For a quick song search, use the song list to search,
                      filter, or simply scroll through gotokaraoke's extensive
                      karaoke song database. Click on any song title to find its
                      karaoke version on YouTube. If you prefer a more visual
                      approach, navigate to "Album Grid" to search for songs by
                      their album cover. If you have time, create an account by
                      selecting "LOGIN" and selecting the link to create an
                      account. Enter a unique username and password to login.
                      Once logged in, you can will notice that songs in the song
                      list and album grid now have "+" and "-" icons which you
                      can use to add or remove songs from your saved songs list.
                      Access this list by selecting "MY SAVED SONGS". Your
                      profile list is securely saved in gotokaraoke's database
                      for easy access!
                    </Typography>
                    <div className="help-modal-img-block">
                      <div className="help-modal-img-container">
                        <img
                          src={albumsGrid}
                          alt="Preview of song list"
                          className="help-modal-image"
                        />
                      </div>
                      <div className="help-modal-img-container">
                        <img
                          src={songList}
                          alt="Preview of song list"
                          className="help-modal-image help-modal-image--small"
                        />
                      </div>

                      <div className="help-modal-img-container">
                        <img
                          src={mobileGrid}
                          alt="Preview of song grid"
                          className="help-modal-mobile-image help-modal-mobile-image--grid"
                        />
                      </div>
                    </div>
                    <div className="help-modal-img-block">
                      <div className="help-modal-img-container">
                        <img
                          src={albumsGridAdd}
                          alt="Preview of song list"
                          className="help-modal-image help-modal-image--small"
                        />
                      </div>
                      <div className="help-modal-img-container">
                        <img
                          src={songListAdd}
                          alt="Preview of song list"
                          className="help-modal-image "
                        />
                      </div>
                      <div className="help-modal-img-container">
                        <img
                          src={mobileList}
                          alt="Preview of song list"
                          className="help-modal-mobile-image help-modal-mobile-image--list"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        )}
        {!sessionStorage.getItem("seenModal") && (
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
              <div className="welcome-modal-box">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="video video--mobile"
                >
                  <source src={tunnelVertical} type="video/mp4" />
                </video>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
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
                    gotokaraoke's expert song finder to search, filter, and
                    scroll through our curated karaoke tracks. Click on a song
                    title to open the karaoke version on Youtube!
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
