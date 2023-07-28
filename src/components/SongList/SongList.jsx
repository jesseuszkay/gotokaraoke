import "./SongList.scss";
import convertMillisecondsToMMSS from "../../utils/ms_to_mins";
import { Link } from "react-router-dom";
import {
  addSongToList,
  removeSongFromList,
  obtainUserDetails,
} from "../../utils/database";

export default function SongList({
  songList,
  isLoggedIn,
  userDetails,
  setUserDetails,
}) {
  if (!songList.length) {
    return <div className=""></div>;
  }

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

  if (isLoggedIn) {
    if (!userDetails) {
      return <div className=""></div>;
    }
  }

  return (
    <div className="list">
      {songList.map((song) => {
        return (
          <div className="list__track" key={song.id}>
            <Link
              target="_blank"
              to={`https://www.youtube.com/watch?v=${song.videoId}`}
            >
              <div className="list__track-title">{song.title}</div>
            </Link>
            <div className="list__other-track-info">
              <div className="list__track-artists">{song.artists}</div>
              <div className="list__track-year">{song.year_released}</div>
              <div className="list__track-time">
                {convertMillisecondsToMMSS(song.duration_ms)}
              </div>
              {isLoggedIn &&
                !userDetails.songs.some((listSong) => {
                  return listSong.id === song.id;
                }) && (
                  <button
                    className="list__track-button list__track-button--add"
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
                    className="list__track-button list__track-button--remove"
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
  );
}
