export default function convertMillisecondsToMMSS(milliseconds) {
  var seconds = Math.floor(milliseconds / 1000);
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  var minutesFormatted = minutes < 10 ? minutes : minutes;
  var secondsFormatted = seconds < 10 ? "0" + seconds : seconds;

  return minutesFormatted + ":" + secondsFormatted;
}
