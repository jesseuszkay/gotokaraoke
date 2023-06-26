import axios from "axios";

export function obtainSongList(
  songFilters,
  pageNumberArg,
  songCountFunction,
  songListFunction,
  showBackFunction,
  showNextFunction
) {
  axios
    .get(`http://localhost:8080/songs${songFilters}`)
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
