import songList from "../../assets/help-modal-img/list.png";
import albumsGrid from "../../assets/help-modal-img/grid.png";
import songListAdd from "../../assets/help-modal-img/list-add.png";
import albumsGridAdd from "../../assets/help-modal-img/grid-add.png";
import mobileList from "../../assets/help-modal-img/list-mobile.png";
import mobileGrid from "../../assets/help-modal-img/grid-mobile.png";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./HelpModal.scss";

function HelpModal({ help, setHelp }) {
  const handleClose = () => {
    setHelp(false);
  };

  return (
    <div className="help-modal">
      {help && (
        <Modal
          open={help}
          onClose={handleClose}
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
              <IconButton id="help-modal__close-button" onClick={handleClose}>
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
                    their album cover.
                  </Typography>
                  <Typography id="help-modal__description">
                    If you have time, create an account by clicking "LOGIN" and
                    selecting the link to create an account. Enter a unique
                    username and password, and then re-enter on the login page.
                    Once logged in, you will notice that songs in the song list
                    and album grid now have "+" and "-" icons which you can use
                    to add or remove songs from your saved songs list. Access
                    this list by selecting "MY SAVED SONGS". Your profile list
                    is securely saved in gotokaraoke's database for easy access!
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
    </div>
  );
}

export default HelpModal;
