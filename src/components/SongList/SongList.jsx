import "./SongList.scss";
import {
  obtainUserDetails,
  addSongToList,
  removeSongFromList,
} from "../../utils/database";
import convertMillisecondsToMMSS from "../../utils/ms_to_mins";
import { Link } from "react-router-dom";

export default function SongList({
  songList,
  isLoggedIn,
  userDetails,
  setUserDetails,
}) {
  function handleOnClick(event) {
    if (event.target.id === "add") {
      addSongToList(event.target.value, userDetails.userId);
    }
    if (event.target.id === "remove") {
      removeSongFromList(event.target.value, userDetails.userId);
    }
    obtainUserDetails(setUserDetails);
  }

  return (
    <div className="list">
      {songList.map((song) => {
        return (
          <div className="list__track" key={song.id}>
            <div className="list__track-title">{song.title}</div>
            <div className="list__track-artists">{song.artists}</div>
            <div className="list__track-year">{song.year_released}</div>
            <div className="list__track-time">
              {convertMillisecondsToMMSS(song.duration_ms)}
            </div>
            <Link
              target="_blank"
              to={`https://www.youtube.com/watch?v=${song.videoId}`}
            >
              <div className="list__track-link">Link to video</div>
            </Link>
            {isLoggedIn &&
              !userDetails.songs.some((listSong) => {
                return listSong.id === song.id;
              }) && (
                <button
                  className="list__track-button"
                  value={song.id}
                  id="add"
                  onClick={handleOnClick}
                >
                  Add to list
                </button>
              )}
            {isLoggedIn &&
              userDetails.songs.some((listSong) => {
                return listSong.id === song.id;
              }) && (
                <button
                  className="list__track-button"
                  value={song.id}
                  id="remove"
                  onClick={handleOnClick}
                >
                  Remove from list
                </button>
              )}
          </div>
        );
      })}
    </div>
  );
}
