import axios from "axios";

function obtainUserDetails(userDetailsFunction) {
  const isLoggedIn = !!sessionStorage.authToken;
  if (isLoggedIn) {
    axios
      .get("http://localhost:8080/user/profile", {
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
}

function obtainSongList(
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
        response.data.slice(pageNumberArg * 15 - 15, pageNumberArg * 15)
      );
      if (
        response.data.slice(
          (pageNumberArg + 1) * 15 - 15,
          (pageNumberArg + 1) * 15
        ).length === 0
      ) {
        showNextFunction(false);
      } else {
        showNextFunction(true);
      }
      if (
        response.data.slice(
          (pageNumberArg - 1) * 15 - 15,
          (pageNumberArg - 1) * 15
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

function addSongToList(song_id, user_id) {
  axios
    .post(`http://localhost:8080/user/profile/add`, {
      song_id,
      user_id,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function removeSongFromList(song_id, user_id) {
  axios
    .delete(`http://localhost:8080/user/profile/${user_id}/${song_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export { obtainUserDetails, addSongToList, removeSongFromList, obtainSongList };
