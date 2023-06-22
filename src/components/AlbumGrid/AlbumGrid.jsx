import album1 from "../../assets/album-art/album-1.webp";
import album2 from "../../assets/album-art/album-2.webp";
import album3 from "../../assets/album-art/album-3.webp";
import album4 from "../../assets/album-art/album-4.webp";
import album7 from "../../assets/album-art/album-7.webp";
import album6 from "../../assets/album-art/album-6.webp";
import "./AlbumGrid.scss";

export default function AlbumGrid({}) {
  return (
    <div className="grid">
      <img src={album1} alt="Marvin Gaye Album" className="grid__album" />
      <img src={album2} alt="Marvin Gaye Album" className="grid__album" />
      <img src={album3} alt="Marvin Gaye Album" className="grid__album" />
      <img src={album4} alt="Marvin Gaye Album" className="grid__album" />
      <img src={album7} alt="Marvin Gaye Album" className="grid__album" />
      <img src={album6} alt="Marvin Gaye Album" className="grid__album" />
    </div>
  );
}
