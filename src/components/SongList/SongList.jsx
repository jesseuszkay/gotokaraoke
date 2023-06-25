import "./SongList.scss";
import {
  obtainUserDetails,
  addSongToList,
  removeSongFromList,
} from "../../utils/database";
import convertMillisecondsToMMSS from "../../utils/ms_to_mins";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SongList({
  songList,
  isLoggedIn,
  userDetails,
  setUserDetails,
}) {
  if (!songList.length) {
    return <div className="">Loading...</div>;
  }

  function handleOnClick(event) {
    const addPromise =
      event.target.id === "add"
        ? axios.post(`http://localhost:8080/user/profile/add`, {
            song_id: event.target.value,
            user_id: userDetails.userId,
          })
        : Promise.resolve(); // No operation if event.target.id is not "add"

    const removePromise =
      event.target.id === "remove"
        ? axios.delete(
            `http://localhost:8080/user/profile/${userDetails.userId}/${event.target.value}`
          )
        : Promise.resolve(); // No operation if event.target.id is not "remove"

    Promise.all([addPromise, removePromise])
      .then(() => {
        axios
          .get("http://localhost:8080/user/profile", {
            headers: {
              Authorization: `Bearer ${sessionStorage.authToken}`,
            },
          })
          .then((response) => {
            setUserDetails(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (isLoggedIn) {
    if (!userDetails) {
      return <div className="">Loading...</div>;
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
                  onClick={handleOnClick}
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
                  onClick={handleOnClick}
                ></button>
              )}
          </div>
        );
      })}
    </div>
  );
}
