import "./Filters.scss";
import { obtainSongList } from "../../utils/database";
import { useState } from "react";
import axios from "axios";
import SongList from "../SongList/SongList";

export default function Filters({
  songCount,
  pageNumber,
  setPageNumber,
  setSongCount,
  setSongList,
  filters,
  setFilters,
  setShowNext,
  setShowBack,
}) {
  const [placeholder, setPlaceholder] = useState("Search...");

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = (event) => {
    if (event.target.value === "") {
      setPlaceholder("Search...");
    }
  };

  function handleOnChange(event) {
    const { name, value } = event.target;

    setPageNumber(1);

    const newFilters = { ...filters, ...{ [name]: value } };

    setFilters(newFilters);

    obtainSongList(
      newFilters,
      pageNumber,
      setSongCount,
      setSongList,
      setShowBack,
      setShowNext
    );
  }

  function handleOnClick(event) {
    event.preventDefault();
    const newFilters = {
      decades: "",
      length: "",
      genre: "",
      search: "",
    };

    setFilters(newFilters);

    obtainSongList(
      newFilters,
      pageNumber,
      setSongCount,
      setSongList,
      setShowBack,
      setShowNext
    );
  }

  return (
    <div className="filters">
      <form className="filters__form">
        <input
          type="text"
          name="search"
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="filters__search"
          autoComplete="off"
          value={filters.search}
          onChange={handleOnChange}
        />
        <div className="filters__dropdowns">
          <label className="filters__label">
            <div className="filters__label-text">Decade:</div>
            <select
              name="decades"
              className={
                filters.decades === ""
                  ? "filters__selects filters__selects--placeholder"
                  : "filters__selects"
              }
              value={filters.decades}
              onChange={handleOnChange}
            >
              <option value="">All</option>
              <option value="1950s">1950s</option>
              <option value="1960s">1960s</option>
              <option value="1970s">1970s</option>
              <option value="1980s">1980s</option>
              <option value="1990s">1990s</option>
              <option value="2000s">2000s</option>
              <option value="2010s">2010s</option>
              <option value="2020s">2020s</option>
            </select>
          </label>
          <label className="filters__label">
            <div className="filters__label-text">Length:</div>
            <select
              name="length"
              className={
                filters.length === ""
                  ? "filters__selects filters__selects--placeholder"
                  : "filters__selects"
              }
              value={filters.length}
              onChange={handleOnChange}
            >
              <option value="">All</option>
              <option value="<2min">Under 2 minutes</option>
              <option value="2-3min">2:00-3:00</option>
              <option value="3-4min">3:00-4:00</option>
              <option value="4-5min">4:00-5:00</option>
              <option value=">5min">Over 5 minutes</option>
            </select>
          </label>
          <label className="filters__label">
            <div className="filters__label-text">Genre:</div>
            <select
              name="genre"
              className={
                filters.genre === ""
                  ? "filters__selects filters__selects--placeholder"
                  : "filters__selects"
              }
              onChange={handleOnChange}
              value={filters.genre}
            >
              <option value="">All</option>
              <option value="1">pop</option>
              <option value="2">dance</option>
              <option value="6">new wave</option>
              <option value="7">rock</option>
              <option value="8">alternative</option>
              <option value="9">alternative rock</option>
              <option value="10">soundtrack</option>
              <option value="12">pop rock</option>
              <option value="13">ska</option>
              <option value="14">classic rock</option>
              <option value="16">soul</option>
              <option value="21">indie</option>
              <option value="22">indie pop</option>
              <option value="23">piano</option>
              <option value="24">rnb</option>
              <option value="25">oldies</option>
              <option value="27">country</option>
              <option value="28">acoustic</option>
              <option value="29">folk</option>
              <option value="31">electronic</option>
              <option value="32">metal</option>
              <option value="33">gothic metal</option>
              <option value="34">gothic</option>
              <option value="35">hard rock</option>
              <option value="36">rap</option>
              <option value="38">hip hop</option>
              <option value="39">nu metal</option>
              <option value="41">jazz</option>
              <option value="43">indie rock</option>
              <option value="45">punk</option>
              <option value="46">punk rock</option>
              <option value="47">emo</option>
              <option value="48">mellow</option>
              <option value="49">britpop</option>
              <option value="50">house</option>
              <option value="51">funk</option>
              <option value="52">blues</option>
              <option value="53">blues rock</option>
              <option value="54">experimental</option>
              <option value="55">chillout</option>
              <option value="56">lounge</option>
              <option value="57">chill</option>
              <option value="58">electro</option>
              <option value="59">classical</option>
              <option value="60">synthpop</option>
              <option value="61">heavy metal</option>
              <option value="62">grunge</option>
              <option value="63">psychedelic</option>
              <option value="64">reggae</option>
              <option value="67">j pop</option>
              <option value="68">new age</option>
            </select>
          </label>
        </div>
        <button className="filters__button" onClick={handleOnClick}>
          Reset Filters
        </button>
      </form>
      {songCount === 0 && (
        <div className="filters__song-count">No songs match your search</div>
      )}
      {songCount === 1 && (
        <div className="filters__song-count">
          {songCount} song matches your search
        </div>
      )}
      {songCount > 1 && (
        <div className="filters__song-count">
          {songCount} songs match your search
        </div>
      )}
    </div>
  );
}
