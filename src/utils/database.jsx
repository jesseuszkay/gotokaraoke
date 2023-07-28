import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

export function obtainTagList(tagListFunction) {
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

export function obtainUserDetails(userDetailsFunction) {
  axios
    .get(apiURL + "/user/profile", {
      headers: {
        Authorization: `Bearer ${sessionStorage.authToken}`,
      },
    })
    .then((response) => {
      userDetailsFunction(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createUserDetails(
  signUpErrorFunction,
  username,
  password,
  navigateFunction
) {
  axios
    .post(apiURL + "/user/signup", {
      username,
      password,
    })
    .then(() => {
      navigateFunction("/login");
    })
    .catch((err) => {
      signUpErrorFunction(true);
    });
}

export function logInUser(
  logInErrorFunction,
  username,
  password,
  navigateFunction
) {
  axios
    .post(apiURL + "/user/login", {
      username,
      password,
    })
    .then((response) => {
      sessionStorage.authToken = response.data.token;
      navigateFunction("/home");
    })
    .catch((err) => {
      logInErrorFunction(true);
    });
}

export function removeSongFromList(username, song) {
  axios.delete(apiURL + `/user/profile/${username}/${song}`);
}
