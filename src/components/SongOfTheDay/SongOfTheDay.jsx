import "./SongOfTheDay.scss";
import { useEffect, useState } from "react";
import {
  getDailySong,
  addDailySong,
  updateDailySongStats,
} from "../../utils/daily_song_updates";

function SongOfTheDay() {
  const [songOfDay, setSongOfDay] = useState(null);
  const [ratings, getRatings] = useState(null);
  const [votes, setVotes] = useState({
    fun: 0,
    boring: 0,
    easy: 0,
    hard: 0,
  });

  useEffect(() => {
    getDailySong(setSongOfDay);
  }, []);

  useEffect(() => {
    if (songOfDay) {
      const videoID = songOfDay.snippet.resourceId.videoId;
      addDailySong(videoID);
      getDailySongStats(videoID, getRatings);
    }
  }, [songOfDay]);

  if (!songOfDay) {
    return <div className="App">Loading...</div>;
  }

  const videoThumbnailURL = songOfDay.snippet.thumbnails.medium.url;
  const videoID = songOfDay.snippet.resourceId.videoId;
  const videoURL = "https://www.youtube.com/watch?v=" + videoID;
  const songInfo = songOfDay.snippet.title;
  const songArtist = songInfo.split(" - ")[0];
  const songTitle = songInfo.split(" - ")[1];

  function handleOnClick(event) {
    const type = event.target.closest("button").value;
    const oppositeType =
      type === "fun"
        ? "boring"
        : type === "boring"
        ? "fun"
        : type === "easy"
        ? "hard"
        : type === "hard"
        ? "easy"
        : "";
    let direction = "";
    if (votes[type] === 0) {
      direction = "increase";
    } else {
      direction = "decrease";
    }
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] === 0 ? 1 : 0,
      [oppositeType]: prev[type] === 0 ? 0 : 1,
    }));
    updateDailySongStats(videoID, type, direction);
  }

  return (
    <div className="daily">
      <a target="_blank" href={videoURL}>
        <img
          className="daily__video"
          src={videoThumbnailURL}
          alt="Video Thumbnail"
        />
      </a>
      <div className="daily__details">
        <h1 className="daily__title">Song of the day</h1>
        <p className="daily__song">{songTitle}</p>
        <p className="daily__artist">{songArtist}</p>
        <div className="daily__vote-message">
          Cast your vote! Is this song fun, boring, easy to sing, or difficult!
        </div>
        <div className="daily__reacts" onClick={handleOnClick}>
          <div className="daily__react-container">
            <button
              className={`${
                votes.fun === 1
                  ? "daily__react daily__react--voted"
                  : "daily__react"
              }`}
              value="fun"
            >
              <div className="daily__emoji">🥳</div>
              <div className="daily__score">{ratings.fun}</div>
            </button>
            <div className="daily__or">or</div>
            <button
              className={`${
                votes.boring === 1
                  ? "daily__react daily__react--voted"
                  : "daily__react"
              }`}
              value="boring"
            >
              <div className="daily__emoji">😴</div>
              <div className="daily__score">{ratings.boring}</div>
            </button>
          </div>
          <div className="daily__react-container">
            <button
              className={`${
                votes.easy === 1
                  ? "daily__react daily__react--voted"
                  : "daily__react"
              }`}
              value="easy"
            >
              <div className="daily__emoji">😋</div>
              <div className="daily__score">{ratings.easy}</div>
            </button>
            <div className="daily__or">or</div>
            <button
              className={`${
                votes.hard === 1
                  ? "daily__react daily__react--voted"
                  : "daily__react"
              }`}
              value="hard"
            >
              <div className="daily__emoji">😣</div>
              <div className="daily__score">{ratings.hard}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongOfTheDay;
