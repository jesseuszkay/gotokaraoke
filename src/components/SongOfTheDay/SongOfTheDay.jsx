import "./SongOfTheDay.scss";
import { useEffect, useState } from "react";
import {
  getDailySong,
  getDailySongStats,
  addDailySong,
  addDailyVote,
  updateDailySongStats,
} from "../../utils/daily_song_updates";
import { Link } from "react-router-dom";

function SongOfTheDay({ isLoggedIn, userDetails }) {
  const [songOfDay, setSongOfDay] = useState(undefined);
  const [ratings, setRatings] = useState(null);
  const [voted, setVoted] = useState({ fun: false, easy: false });

  useEffect(() => {
    getDailySong(setSongOfDay);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (songOfDay) {
        const videoID = songOfDay.id.videoId;
        await addDailySong(videoID);
        if (isLoggedIn && userDetails) {
          await addDailyVote(videoID, userDetails.userId);
          getDailySongStats(videoID, setRatings);
        }
      }
    };

    fetchData();
  }, [songOfDay, ratings]);

  if (!songOfDay || (isLoggedIn && !ratings)) {
    return <div className="">Loading...</div>;
  }

  const videoThumbnailURL = songOfDay.snippet.thumbnails.medium.url;
  const videoID = songOfDay.id.videoId;
  const videoURL = "https://www.youtube.com/watch?v=" + videoID;
  const songInfo = songOfDay.snippet.title;
  const songArtist = songInfo.split(" - ")[0];
  const songTitle = songInfo.split(" - ")[1];

  function handleOnClick(event) {
    const type = event.target.closest("button").value;
    updateDailySongStats(videoID, userDetails.userId, type);
    setVoted((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    getDailySongStats(videoID, setRatings);
  }

  return (
    <div className="daily">
      <Link target="_blank" to={videoURL} className="daily__link">
        <img
          className="daily__thumbnail"
          src={videoThumbnailURL}
          alt="Video Thumbnail"
        />
      </Link>
      <div className="daily__details">
        <div className="daily__info">
          <h1 className="daily__title">Song of the day</h1>
          <p className="daily__song">{songTitle}</p>
          <p className="daily__artist">{songArtist}</p>
        </div>
        {isLoggedIn && (
          <div className="daily__voting">
            <div className="daily__vote-message">
              We would love to know if you think this song is fun and/or easy to
              sing!
            </div>
            <div className="daily__reacts" onClick={handleOnClick}>
              <button
                className={`${
                  voted.fun
                    ? "daily__react daily__react--voted"
                    : "daily__react"
                }`}
                value="fun"
              >
                <div className="daily__emoji">🥳</div>
                <div className="daily__score">{ratings.fun}</div>
              </button>
              <button
                className={`${
                  voted.easy
                    ? "daily__react daily__react--voted"
                    : "daily__react"
                }`}
                value="easy"
              >
                <div className="daily__emoji">😋</div>
                <div className="daily__score">{ratings.easy}</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SongOfTheDay;
