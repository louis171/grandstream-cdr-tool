// Converts seconds to HH:MM:SS
// Doesnt include hours if there are none
export const secondsToHHMMSS = (duration) => {
  let hrs = ~~(duration / 3600);
  let mins = ~~((duration % 3600) / 60);
  let secs = ~~duration % 60;
  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};

// Converts string to title case
// e.g. ANSWERED => Answered
export const titleCase = (str) => {
  str = str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  return str.join(" ");
};

// Simple GUID generator
// e.g. 9e0b2d5d-741f-7271-9faf-ab70edae24bd
export const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

// Regex for validating IPV4 addresses
// Seems to allow 0.0.0.0
// TODO ****FIX****
export const validateIPaddress = (ipaddress) => {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return false;
  }
  return true;
};
