import axios from "axios";

function getDailySong(dailySongFunction) {
  const YoutubeAPI = "AIzaSyB52p07gtoAxA_C5Fft-7DbaBi4aFesFU0";
  const secondaryYoutubeAPI = "AIzaSyBPtmKRYr1l9ZLuj4b3Lm8zIUHRKtwELts";
  const YoutubeAPIURL =
    "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PL8D4Iby0Bmm9y57_K3vBvkZiaGjIXD_x5&maxResults=1&key=" +
    secondaryYoutubeAPI +
    "&part=snippet&fields=items(snippet(title,thumbnails(medium(url)),resourceId(videoId)))";

  axios
    .get(YoutubeAPIURL)
    .then((response) => {
      dailySongFunction(response.data.items[0]);
    })
    .catch((error) => {
      alert(error);
    });
}

function getDailySongStats(videoId, dailySongStatsFunction) {
  axios
    .get(`http://localhost:8080/dailysongs/get/${videoId}`)
    .then((response) => {
      dailySongStatsFunction(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addDailySong(videoId) {
  axios
    .post(`http://localhost:8080/dailysongs/add`, {
      videoId,
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateDailySongStats(videoId, type, direction) {
  axios
    .patch(`http://localhost:8080/dailysongs/rate/${videoId}`, {
      type,
      direction,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export { getDailySong, addDailySong, updateDailySongStats, getDailySongStats };
