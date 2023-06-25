import "./Profile.scss";
import { useNavigate, Link } from "react-router-dom";
import convertMillisecondsToMMSS from "../../utils/ms_to_mins";
import axios from "axios";

export default function Profile({ userDetails, setUserDetails }) {
  const navigate = useNavigate();

  function handleOnClick() {
    sessionStorage.clear();
    navigate("/home");
  }

  function handleOnClick2(event) {
    const removePromise = axios.delete(
      `http://localhost:8080/user/profile/${userDetails.userId}/${event.target.value}`
    );

    Promise.all([removePromise])
      .then(() => {
        axios
          .get("http://localhost:8080/user/profile", {
            headers: {
              Authorization: `Bearer ${sessionStorage.authToken}`,
            },
          })
          .then((response) => {
            setUserDetails(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (!userDetails) {
    return <>Loading...</>;
  }

  return (
    <div className="profile">
      <div className="profile__welcome">Welcome, {userDetails.username}!</div>
      <div className="profile__list">
        {!userDetails.songs[0].id && (
          <div className="profile__new-account">
            {" "}
            Add some songs to your list by clicking "add to list" on songs in
            the song finder!
          </div>
        )}
        {userDetails.songs[0].id &&
          userDetails.songs.map((song) => {
            return (
              <div className="profile__list-track" key={song.id}>
                <Link to={`https://www.youtube.com/watch?v=${song.videoId}`}>
                  <div className="profile__list-track-title">{song.title}</div>
                </Link>
                <div className="profile__list-track-artists">
                  {song.artists}
                </div>
                <div className="profile__list-track-year">
                  {song.year_released}
                </div>
                <div className="profile__list-track-time">
                  {convertMillisecondsToMMSS(song.duration_ms)}
                </div>
                <button
                  className="profile__list-track-button"
                  value={song.id}
                  onClick={handleOnClick2}
                ></button>
              </div>
            );
          })}
      </div>
      <button className="profile__log-out" onClick={handleOnClick}>
        Log Out
      </button>
    </div>
  );
}
