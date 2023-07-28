import "./AlbumModal.scss";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import convertMillisecondsToMMSS from "../../utils/ms_to_mins";
import { Link } from "react-router-dom";
import {
  addSongToList,
  removeSongFromList,
  obtainUserDetails,
} from "../../utils/database";

export default function AlbumModal({
  selectedAlbum,
  albumModal,
  setAlbumModal,
  isLoggedIn,
  userDetails,
  setUserDetails,
}) {
  function handleClick(event) {
    const addPromise =
      event.target.id === "add"
        ? addSongToList(userDetails.userId, event.target.value)
        : Promise.resolve(); // No operation if event.target.id is not "add"

    const removePromise =
      event.target.id === "remove"
        ? removeSongFromList(userDetails.userId, event.target.value)
        : Promise.resolve(); // No operation if event.target.id is not "remove"

    Promise.all([addPromise, removePromise])
      .then(() => {
        obtainUserDetails(setUserDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleClose = () => {
    setAlbumModal(false);
  };

  return (
    <Modal
      open={albumModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        border: "none",
      }}
    >
      <Box
        id="album-modal"
        sx={{
          border: "none",
        }}
      >
        <div className="album-modal__box">
          <IconButton id="album-modal__close-button" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <div className="album-modal__album-info">
            <img
              src={selectedAlbum.album_art}
              alt="ABBA Gold Album"
              className="album-modal__image album-modal__image--desktop"
            />
            <div className="album-modal__text">
              <div className="album-modal__header">
                <img
                  src={selectedAlbum.album_art}
                  alt="ABBA Gold Album"
                  className="album-modal__image album-modal__image--mobile"
                />
                <div className="album-modal__details">
                  <Typography id="album-modal__title">
                    {selectedAlbum.title}
                  </Typography>
                  <Typography id="album-modal__artist">
                    {selectedAlbum.artist}, {selectedAlbum.year_released}
                  </Typography>
                </div>
              </div>

              <div className="album-modal__track-list">
                {selectedAlbum.songs.map((song) => {
                  return (
                    <div className="album-modal__track" key={song.id}>
                      <Link
                        target="_blank"
                        to={`https://www.youtube.com/watch?v=${song.videoId}`}
                      >
                        <div className="album-modal__track-title">
                          {song.title}
                        </div>
                      </Link>
                      <div className="album-modal__other-track-info">
                        <div className="album-modal__track-time">
                          {convertMillisecondsToMMSS(song.duration_ms)}
                        </div>
                        {isLoggedIn &&
                          !userDetails.songs.some((listSong) => {
                            return listSong.id === song.id;
                          }) && (
                            <button
                              className="album-modal__track-button album-modal__track-button--add"
                              value={song.id}
                              id="add"
                              onClick={handleClick}
                            ></button>
                          )}
                        {isLoggedIn &&
                          userDetails.songs.some((listSong) => {
                            return listSong.id === song.id;
                          }) && (
                            <button
                              className="album-modal__track-button album-modal__track-button--remove"
                              value={song.id}
                              id="remove"
                              onClick={handleClick}
                            ></button>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
