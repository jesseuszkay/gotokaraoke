import "./Profile.scss";
import { useNavigate, Link } from "react-router-dom";
import convertMillisecondsToMMSS from "../../utils/ms_to_mins";
import nextArrow from "../../assets/icons/arrows/arrow.png";
import backArrow from "../../assets/icons/arrows/backarrow.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { obtainUserDetails } from "../../utils/database";

export default function Profile({ userDetails, setUserDetails, apiURL }) {
  const navigate = useNavigate();
  const [profilePageNumber, setProfilePageNumber] = useState(1);
  const [showProfileBack, setShowProfileBack] = useState(false);
  const [showProfileNext, setShowProfileNext] = useState(false);

  function handleClick() {
    sessionStorage.clear();
    navigate("/");
  }

  function handleClick2(event) {
    const removePromise = axios.delete(
      apiURL + `/user/profile/${userDetails.userId}/${event.target.value}`
    );
    const changePage = () => {
      console.log((userDetails.songs.length - 1) % 5);
      if ((userDetails.songs.length - 1) % 5 === 0) {
        setProfilePageNumber((prev) => prev - 1);
      }
    };

    Promise.all([removePromise, changePage()])
      .then(() => {
        obtainUserDetails(setUserDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClick3(event) {
    if (event.target.id === "next" && showProfileNext) {
      setProfilePageNumber((prev) => prev + 1);
      setShowProfileBack(true);
      if (profilePageNumber >= userDetails.songs.length / 5 - 1) {
        setShowProfileNext(false);
      }
    } else if (event.target.id === "back" && showProfileBack) {
      setProfilePageNumber((prev) => prev - 1);
      setShowProfileNext(true);
      if (profilePageNumber === 2) {
        setShowProfileBack(false);
      }
    }
  }

  if (!userDetails) {
    return <></>;
  }

  useEffect(() => {
    if (userDetails.songs.length - 5 * profilePageNumber > 0) {
      setShowProfileNext(true);
    } else {
      setShowProfileNext(false);
    }
    if (profilePageNumber === 1) {
      setShowProfileBack(false);
    }
  }, [userDetails]);

  return (
    <div className="profile">
      <div className="profile__welcome">Welcome, {userDetails.username}!</div>
      {!userDetails.songs[0].id && (
        <div className="profile__new-account">
          <div className="profile__new-account-text">
            Your song list is looking a little empty!
          </div>
          <div className="profile__new-account-text">
            Navigate to the Song Finder and click the
          </div>
          <div className="profile__new-account-add-icon"></div>
          <div className="profile__new-account-text">
            icons to add songs to your list.
          </div>
        </div>
      )}

      {userDetails.songs[0].id && (
        <div className="profile__list">
          <div className="profile__mobile-buttons">
            <img
              src={backArrow}
              alt="Arrow to previous page"
              className={`${
                showProfileBack
                  ? "profile__button profile__back-button--mobile"
                  : "profile__button profile__button--hide profile__back-button--mobile "
              }`}
              id="back"
              onClick={handleClick3}
            />
            <img
              src={nextArrow}
              alt="Arrow to next page"
              onClick={handleClick3}
              id="next"
              className={`${
                showProfileNext
                  ? "profile__button profile__next-button--mobile profile__next-button-arrow"
                  : "profile__button profile__button--hide profile__next-button--mobile profile__next-button-arrow"
              }`}
            />
          </div>
          <img
            src={backArrow}
            alt="Arrow to previous page"
            className={`${
              showProfileBack
                ? "profile__button profile__back-button"
                : "profile__button profile__button--hide profile__back-button"
            }`}
            id="back"
            onClick={handleClick3}
          />
          <div className="profile__song-list-tracks">
            {userDetails.songs
              .slice(profilePageNumber * 5 - 5, profilePageNumber * 5)
              .map((song) => {
                return (
                  <div className="profile__list-track" key={song.id}>
                    <Link
                      target="_blank"
                      to={`https://www.youtube.com/watch?v=${song.videoId}`}
                    >
                      <div className="profile__list-track-title">
                        {song.title}
                      </div>
                    </Link>
                    <div className="profile__list-other-track-info">
                      <div className="profile__list-track-artists">
                        {song.artists}
                      </div>
                      <div className="profile__list-track-year">
                        {song.year_released}
                      </div>
                      <div className="profile__list-track-time">
                        {convertMillisecondsToMMSS(song.duration_ms)}
                      </div>
                      <button
                        className="profile__list-track-button"
                        value={song.id}
                        onClick={handleClick2}
                      ></button>
                    </div>
                  </div>
                );
              })}
          </div>
          <img
            src={nextArrow}
            alt="Arrow to next page"
            onClick={handleClick3}
            id="next"
            className={`${
              showProfileNext
                ? "profile__button profile__next-button profile__next-button-arrow"
                : "profile__button profile__button--hide profile__next-button profile__next-button-arrow"
            }`}
          />
          <div className="profile__mobile-buttons">
            <img
              src={backArrow}
              alt="Arrow to previous page"
              className={`${
                showProfileBack
                  ? "profile__button profile__back-button--mobile"
                  : "profile__button profile__button--hide profile__back-button--mobile "
              }`}
              id="back"
              onClick={handleClick3}
            />
            <img
              src={nextArrow}
              alt="Arrow to next page"
              onClick={handleClick3}
              id="next"
              className={`${
                showProfileNext
                  ? "profile__button profile__next-button--mobile profile__next-button-arrow"
                  : "profile__button profile__button--hide profile__next-button--mobile profile__next-button-arrow"
              }`}
            />
          </div>
        </div>
      )}
      <div className="profile__buttons">
        <button
          className="profile__back-home"
          onClick={() => {
            navigate("/home");
          }}
        >
          <span>Back to song finder</span>
        </button>
        <button className="profile__log-out" onClick={handleClick}>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
