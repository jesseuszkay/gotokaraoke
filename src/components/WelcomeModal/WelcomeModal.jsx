import tunnel from "../../assets/videos/tunnel.mp4";
import tunnelVertical from "../../assets/videos/tunnel-vertical.mp4";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./WelcomeModal.scss";

function WelcomeModal({ welcome, setWelcome }) {
  const handleClose = () => {
    setWelcome(false);
    sessionStorage.setItem("seenWelcomeModal", true);
  };

  return (
    <div className="welcome-modal">
      {!sessionStorage.getItem("seenWelcomeModal") && (
        <Modal
          open={welcome}
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
                  gotokaraoke's expert song finder to search, filter, and scroll
                  through our curated karaoke tracks. Click on a song title to
                  open the karaoke version on Youtube!
                </Typography>
                <Typography id="welcome-modal__description">
                  Got some time to prep for your next karaoke session? Create an
                  account to save your karaoke song picks so that they are
                  always ready when you need them.
                </Typography>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default WelcomeModal;
