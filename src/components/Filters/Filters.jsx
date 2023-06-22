import "./Filters.scss";
import { obtainSongList } from "../../utils/database";

export default function Filters({
  songCount,
  pageNumber,
  setPageNumber,
  setFilters,
  setSongCount,
  setSongList,
  setShowNext,
  setShowBack,
}) {
  function handleOnSubmit(event) {
    event.preventDefault();
    setPageNumber(1);
    const newFilters =
      "/" +
      event.target.decades.value +
      "&" +
      event.target.length.value +
      "&" +
      event.target.genre.value +
      "&" +
      event.target.search.value;
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
      <form className="filters__form" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="filters__search"
          autoComplete="off"
        />
        <div className="filters__dropdowns">
          <label className="filters__label">
            Decade:
            <select name="decades" className="filters__decades">
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
            Length:
            <select name="length" className="filters__length">
              <option value="">All</option>
              <option value="<2min">Under 2 minutes</option>
              <option value="2-3min">2:00-3:00</option>
              <option value="3-4min">3:00-4:00</option>
              <option value="4-5min">4:00-5:00</option>
              <option value=">5min">Over 5 minutes</option>
            </select>
          </label>
          <label className="filters__label">
            Genre:
            <select name="genre" className="filters__genre">
              <option value="">All</option>
              <option value="1">Pop</option>
              <option value="2">Dance</option>
              <option value="6">New Wave</option>
              <option value="7">Rock</option>
            </select>
          </label>
        </div>
        <div className="filters__buttons">
          <button type="submit" className="filters__button">
            Filter Songs
          </button>
          <input
            type="reset"
            value="Reset Filters"
            className="filters__button"
          ></input>
        </div>
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
