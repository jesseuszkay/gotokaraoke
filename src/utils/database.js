import axios from "axios";

export function obtainTagList(tagListFunction) {
  const apiURL = import.meta.env.VITE_API_URL;
  axios
    .get(apiURL + `/tags`)
    .then((response) => {
      tagListFunction(response.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
      }
    });
}

export function obtainSongList(
  songFilters,
  pageNumberArg,
  songCountFunction,
  songListFunction,
  showBackFunction,
  showNextFunction
) {
  const filtersURL =
    "/" +
    songFilters.decades +
    "&" +
    songFilters.length +
    "&" +
    songFilters.genre +
    "&" +
    songFilters.search;
  const apiURL = import.meta.env.VITE_API_URL;
  axios
    .get(apiURL + `/songs${filtersURL}`)
    .then((response) => {
      if (response.data.length > 0) {
        songCountFunction(response.data.length);
      }
      if (response.data.length === 0) {
        songCountFunction(0);
      }
      songListFunction(
        response.data.slice(pageNumberArg * 10 - 10, pageNumberArg * 10)
      );
      if (
        response.data.slice(
          (pageNumberArg + 1) * 10 - 10,
          (pageNumberArg + 1) * 10
        ).length === 0
      ) {
        showNextFunction(false);
      } else {
        showNextFunction(true);
      }
      if (
        response.data.slice(
          (pageNumberArg - 1) * 10 - 10,
          (pageNumberArg - 1) * 10
        ).length === 0
      ) {
        showBackFunction(false);
      } else {
        showBackFunction(true);
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
      }
    });
}
