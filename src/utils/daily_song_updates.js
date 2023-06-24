import axios from "axios";

function getDailySong(dailySongFunction) {
  const YoutubeAPI = "AIzaSyC9CoQeqW4XIdevA1XQTdZR8w8u7iL8fJA";
  const secondaryYoutubeAPI = "AIzaSyBPtmKRYr1l9ZLuj4b3Lm8zIUHRKtwELts";
  const YoutubeAPIURL =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    YoutubeAPI +
    "&channelId=UCwTRjvjVge51X-ILJ4i22ew&part=snippet&fields=items(id(videoId),snippet(title,thumbnails(medium(url))))&order=date&maxResults=1";
  axios
    .get(YoutubeAPIURL)
    .then((response) => {
      dailySongFunction(response.data.items[0]);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addDailySong(videoId) {
  axios
    .post(`http://localhost:8080/dailysongs/addSong`, {
      videoId,
    })
    .catch();
}

function addDailyVote(videoId, userId) {
  axios
    .post(`http://localhost:8080/dailysongs/addVote`, {
      videoId,
      userId,
    })
    .catch();
}

function getDailySongStats(videoId, dailySongStatsFunction) {
  axios
    .get(`http://localhost:8080/dailysongs/get/${videoId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.authToken}`,
      },
    })
    .then((response) => {
      dailySongStatsFunction(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function updateDailySongStats(videoId, userId, type) {
  axios
    .patch(`http://localhost:8080/dailysongs/rate/${videoId}`, {
      type,
      userId,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  getDailySong,
  addDailySong,
  addDailyVote,
  updateDailySongStats,
  getDailySongStats,
};
