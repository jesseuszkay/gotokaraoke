import "./AlbumGrid.scss";
import "../AlbumModal/AlbumModal.scss";
import abba from "../../assets/album-art/abba.png";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import convertMillisecondsToMMSS from "../../utils/ms_to_mins";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AlbumGrid({ apiURL }) {
  const [albumModalOpen, setAlbumModalOpen] = useState(false);

  const handleOnClick = (event) => {
    axios
      .get(apiURL + `/albums/${event.target.id}`)
      .then((response) => {
        setAlbumModalOpen(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
        }
      });
  };

  const handleClose = () => {
    setAlbumModalOpen(false);
  };

  const songs = [
    {
      id: 1,
      title: "cool song",
      artists: "cool artist",
      year_released: "2006",
      duration_ms: 240000,
      videoId: "ibe2UCSGBlw",
    },
    {
      id: 2,
      title: "cooler song",
      artists: "cool artist",
      year_released: "2006",
      duration_ms: 240000,
      videoId: "ibe2UCSGBlw",
    },
    {
      id: 3,
      title: "coolest song",
      artists: "cool artist",
      year_released: "2006",
      duration_ms: 240000,
      videoId: "ibe2UCSGBlw",
    },
  ];

  const album = {
    title: "Gold",
    artists: "ABBA",
    image: abba,
  };

  return (
    <>
      <div className="grid">
        <img
          src={abba}
          alt="ABBA Gold Album"
          className="grid__album"
          onClick={handleOnClick}
          id="4"
        />
      </div>
      {albumModalOpen && (
        <Modal
          open={albumModalOpen}
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
                  src={album.image}
                  alt="ABBA Gold Album"
                  className="album-modal__image"
                />
                <div className="album-modal__text">
                  <Typography id="album-modal__title">
                    {album.title} - {album.artists}
                  </Typography>

                  <div className="album-modal__track-list">
                    {songs.map((song) => {
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
                            <div className="album-modal__track-artists">
                              {song.artists}
                            </div>
                            <div className="album-modal__track-year">
                              {song.year_released}
                            </div>
                            <div className="album-modal__track-time">
                              {convertMillisecondsToMMSS(song.duration_ms)}
                            </div>
                            {/*  {isLoggedIn &&
                                    !userDetails.songs.some((listSong) => {
                                      return listSong.id === song.id;
                                    }) && (
                                      <button
                                        className="album-modal__track-button album-modal__track-button--add"
                                        value={song.id}
                                        id="add"
                                        onClick={handleOnClick}
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
                                        onClick={handleOnClick}
                                      ></button>
                                    )} */}
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
      )}
    </>
  );
}
