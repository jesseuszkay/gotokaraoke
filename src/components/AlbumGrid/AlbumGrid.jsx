import album1 from "../../assets/album-art/album-1.webp";
import album2 from "../../assets/album-art/album-2.webp";
import album3 from "../../assets/album-art/album-3.webp";
import album4 from "../../assets/album-art/album-4.webp";
import album5 from "../../assets/album-art/album-5.webp";
import album6 from "../../assets/album-art/album-6.webp";
import album7 from "../../assets/album-art/album-7.webp";
import album8 from "../../assets/album-art/album-8.webp";
import album9 from "../../assets/album-art/album-9.webp";

import "./AlbumGrid.scss";

export default function AlbumGrid({}) {
  return (
    <div className="grid">
      <img src={album1} alt="Album Art" className="grid__album" />
      <img src={album2} alt="Album Art" className="grid__album" />
      <img src={album3} alt="Album Art" className="grid__album" />
      <img src={album4} alt="Album Art" className="grid__album" />
      <img src={album5} alt="Album Art" className="grid__album" />
      <img src={album6} alt="Album Art" className="grid__album" />
      <img src={album7} alt="Album Art" className="grid__album" />
      <img src={album8} alt="Album Art" className="grid__album" />
      <img src={album9} alt="Album Art" className="grid__album" />
    </div>
  );
}
