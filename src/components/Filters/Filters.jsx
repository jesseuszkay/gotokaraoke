import "./Filters.scss";
import { obtainSongList } from "../../utils/database";
import { useState } from "react";

export default function Filters({
  songCount,
  pageNumber,
  setPageNumber,
  setSongCount,
  tagList,
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

  function handleClick(event) {
    event.preventDefault();
    const newFilters = {
      decades: "",
      length: "",
      genre: "",
      search: "",
    };
    setPlaceholder("Search...");
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
              {tagList.map((tag) => {
                return (
                  <option value={tag.id} key={tag.id}>
                    {tag.tag_name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <button className="filters__button" onClick={handleClick}>
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
