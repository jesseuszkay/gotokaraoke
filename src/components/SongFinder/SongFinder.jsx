import "./SongFinder.scss";
import { useEffect, useState } from "react";
import React from "react";
import nextArrow from "../../assets/arrow.png";
import backArrow from "../../assets/backarrow.png";
import Filters from "../Filters/Filters";
import SongList from "../SongList/SongList";
import LoadingMicrophone from "../LoadingMicrophone/LoadingMicrophone";
import { obtainSongList } from "../../utils/database";

export default function SongFinder({
  isLoggedIn,
  userDetails,
  setUserDetails,
  apiURL,
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

  function handleClick(event) {
    if (event.target.id === "next" && showNext) {
      setPageNumber((prev) => prev + 1);
    } else if (event.target.id === "back" && showBack) {
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
        <LoadingMicrophone />
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
          <img
            src={backArrow}
            alt="Arrow to previous page"
            className={`${
              showBack
                ? "finder__button finder__back-button--mobile"
                : "finder__button finder__button--hide finder__back-button--mobile "
            }`}
            id="back"
            onClick={handleClick}
          />
          <img
            src={nextArrow}
            alt="Arrow to next page"
            onClick={handleClick}
            id="next"
            className={`${
              showNext
                ? "finder__button finder__next-button--mobile finder__next-button-arrow"
                : "finder__button finder__button--hide finder__next-button--mobile finder__next-button-arrow"
            }`}
          />
        </div>
        <img
          src={backArrow}
          alt="Arrow to previous page"
          className={`${
            showBack
              ? "finder__button finder__back-button"
              : "finder__button finder__button--hide finder__back-button"
          }`}
          id="back"
          onClick={handleClick}
        />
        <div className="finder__song-list">
          <SongList
            songList={songList}
            isLoggedIn={isLoggedIn}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            apiURL={apiURL}
          />
        </div>
        <img
          src={nextArrow}
          alt="Arrow to next page"
          onClick={handleClick}
          id="next"
          className={`${
            showNext
              ? "finder__button finder__next-button finder__next-button-arrow"
              : "finder__button finder__button--hide finder__next-button finder__next-button-arrow"
          }`}
        />
        <div className="finder__mobile-buttons">
          <img
            src={backArrow}
            alt="Arrow to previous page"
            className={`${
              showBack
                ? "finder__button finder__back-button--mobile"
                : "finder__button finder__button--hide finder__back-button--mobile "
            }`}
            id="back"
            onClick={handleClick}
          />
          <img
            src={nextArrow}
            alt="Arrow to next page"
            onClick={handleClick}
            id="next"
            className={`${
              showNext
                ? "finder__button finder__next-button--mobile finder__next-button-arrow"
                : "finder__button finder__button--hide finder__next-button--mobile finder__next-button-arrow"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
