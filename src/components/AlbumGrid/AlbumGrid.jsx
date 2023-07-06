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
import { useEffect, useState } from "react";
import axios from "axios";

export default function AlbumGrid({ apiURL }) {
  const [albumModalOpen, setAlbumModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [allAlbums, setAllAlbums] = useState(null);

  useEffect(() => {
    axios
      .get(apiURL + `/albums`)
      .then((response) => {
        setAllAlbums(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
        }
      });
  }, []);

  const handleOnClick = (event) => {
    axios
      .get(apiURL + `/albums/${event.target.id}`)
      .then((response) => {
        setSelectedAlbum(response.data);
      })
      .then(() => {
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

  if (!allAlbums) {
    return <></>;
  }

  return (
    <>
      <div className="grid">
        {allAlbums.map((album) => {
          return (
            <img
              src={album.album_art}
              alt={album.title}
              className="grid__album"
              onClick={handleOnClick}
              id={album.id}
              key={album.id}
            />
          );
        })}
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
                  src={selectedAlbum.album_art}
                  alt="ABBA Gold Album"
                  className="album-modal__image"
                />
                <div className="album-modal__text">
                  <Typography id="album-modal__title">
                    {selectedAlbum.title} - {selectedAlbum.artist}
                  </Typography>

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
                            <div className="album-modal__track-artists">
                              {song.artist}
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
