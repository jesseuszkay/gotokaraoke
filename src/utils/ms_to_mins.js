export default function convertMillisecondsToMMSS(milliseconds) {
  var seconds = Math.floor(milliseconds / 1000); // Convert milliseconds to seconds
  var minutes = Math.floor(seconds / 60); // Extract minutes
  seconds = seconds % 60; // Extract remaining seconds

  // Add leading zeros if necessary
  var minutesFormatted = minutes < 10 ? minutes : minutes;
  var secondsFormatted = seconds < 10 ? "0" + seconds : seconds;

  return minutesFormatted + ":" + secondsFormatted;
}
