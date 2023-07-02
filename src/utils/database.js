import axios from "axios";

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

  console.log(filtersURL);
  axios
    .get(apiURL + `/songs${filtersURL}`)
    .then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
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
