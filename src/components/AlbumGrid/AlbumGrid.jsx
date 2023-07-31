import "./AlbumGrid.scss";
import "../AlbumModal/AlbumModal.scss";
import { useEffect, useState } from "react";
import AlbumModal from "../AlbumModal/AlbumModal";
import {obtainAlbums,obtainAlbumSongs} from "../../utils/database";

export default function AlbumGrid({
  apiURL,
  isLoggedIn,
  userDetails,
  setUserDetails,
}) {
  const [albumModal, setAlbumModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [allAlbums, setAllAlbums] = useState(null);
  const [loadIn, setLoadIn] = useState(true);

  useEffect(() => {

    obtainAlbums(setAllAlbums);

    setTimeout(() => {
      setLoadIn(false);
    }, 1000);
  }, []);

  const handleClick = (event) => {
    obtainAlbumSongs(event.target.id,setSelectedAlbum, setAlbumModal);
  };

  if (!allAlbums) {
    return <></>;
  }

  return (
    <>
      <div className="grid">
        {allAlbums.map((album) => {
          return (
            <img
              src={album.album_art}
              alt={album.title}
              className={
                loadIn ? "grid__album grid__album--load-in" : "grid__album"
              }
              onClick={handleClick}
              id={album.id}
              key={album.id}
            />
          );
        })}
      </div>
      {albumModal && (
        <AlbumModal
          isLoggedIn={isLoggedIn}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          selectedAlbum={selectedAlbum}
          apiURL={apiURL}
          albumModal={albumModal}
          setAlbumModal={setAlbumModal}
        />
      )}
    </>
  );
}
