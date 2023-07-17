import micIcon from "../../assets/microphone.png";
import "./LoadingMicrophone.scss";

export default function LoadingMicrophone() {
  return (
    <div className="loading-mic">
      <img
        src={micIcon}
        alt="Microphone"
        className="loading-mic__icon animate__tada"
      />
    </div>
  );
}
