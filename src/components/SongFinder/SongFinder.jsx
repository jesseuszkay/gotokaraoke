import "./SongFinder.scss";
import { useEffect, useState } from "react";
import React from "react";
import micIcon from "../../assets/microphone.png";
import Filters from "../Filters/Filters";
import SongList from "../SongList/SongList";
import { obtainSongList } from "../../utils/database";

export default function SongFinder({
  isLoggedIn,
  userDetails,
  setUserDetails,
}) {
  const [songList, setSongList] = useState(null);
  const [songCount, setSongCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showBack, setShowBack] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    decades: "",
    length: "",
    genre: "",
  });

  function handleOnClick(event) {
    if (event.target.value === "next" && showNext) {
      setPageNumber((prev) => prev + 1);
    } else if (event.target.value === "back" && showBack) {
      setPageNumber((prev) => prev - 1);
    }
    window.scrollTo({ top: 0 });
  }

  useEffect(() => {
    setTimeout(() => {
      obtainSongList(
        filters,
        pageNumber,
        setSongCount,
        setSongList,
        setShowBack,
        setShowNext
      );
    }, 500);
  }, [pageNumber]);

  if (!songList || (isLoggedIn && !userDetails)) {
    return (
      <div className="finder">
        <div className="finder__loading">
          <img
            src={micIcon}
            alt="Microphone"
            className="finder__loading-icon animate__tada"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="finder">
      <Filters
        songCount={songCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        filters={filters}
        setFilters={setFilters}
        setSongCount={setSongCount}
        setSongList={setSongList}
        setShowNext={setShowNext}
        setShowBack={setShowBack}
      />
      <div className="finder__tool">
        <div className="finder__mobile-buttons">
          <button
            className={`${
              showBack
                ? "finder__button finder__back-button--mobile"
                : "finder__button finder__button--hide finder__back-button--mobile "
            }`}
            value="back"
            onClick={handleOnClick}
          >
            {"Back"}
          </button>
          <button
            className={`${
              showNext
                ? "finder__button finder__next-button--mobile "
                : "finder__button finder__button--hide finder__next-button--mobile"
            }`}
            value="next"
            onClick={handleOnClick}
          >
            {"Next"}
          </button>
        </div>
        <button
          className={`${
            showBack
              ? "finder__button finder__back-button"
              : "finder__button finder__button--hide finder__back-button"
          }`}
          value="back"
          onClick={handleOnClick}
        >
          {"Back"}
        </button>
        <div className="finder__song-list">
          <SongList
            songList={songList}
            isLoggedIn={isLoggedIn}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        </div>
        <button
          className={`${
            showNext
              ? "finder__button finder__next-button "
              : "finder__button finder__button--hide finder__next-button"
          }`}
          value="next"
          onClick={handleOnClick}
        >
          {"Next"}
        </button>
        <div className="finder__mobile-buttons">
          <button
            className={`${
              showBack
                ? "finder__button finder__back-button--mobile"
                : "finder__button finder__button--hide finder__back-button--mobile "
            }`}
            value="back"
            onClick={handleOnClick}
          >
            {"Back"}
          </button>
          <button
            className={`${
              showNext
                ? "finder__button finder__next-button--mobile "
                : "finder__button finder__button--hide finder__next-button--mobile"
            }`}
            value="next"
            onClick={handleOnClick}
          >
            {"Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
