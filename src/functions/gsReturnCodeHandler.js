export const gsReturnCodeHandler = (code) => {
  let message = "";
  switch (code) {
    case 0:
      message = "Success";
      break;
    case -1:
      message = "Invalid parameters";
      break;
    case -5:
      message = "Need authentication";
      break;
    case -6:
      message = "Cookie error";
      break;
    case -7:
      message = "Connection closed";
      break;
    case -8:
      message = "System timeout";
      break;
    case -9:
      message = "Abnormal system error!";
      break;
    case -15:
      message = "Invalid value";
      break;
    case -16:
      message = "No such item. Please refresh the page and try again";
      break;
    case -19:
      message = "Unsupported";
      break;
    case -24:
      message = "Failed to operate data";
      break;
    case -25:
      message = "Failed to update data";
      break;
    case -26:
      message = "Failed to get data";
      break;
    case -37:
      message = "Wrong account or password!";
      break;
    case -43:
      message =
        "Some data in this page has been modified or deleted. Please refresh the page and try again";
      break;
    case -44:
      message = "This item has been added";
      break;
    case -45:
      message =
        "Operating too frequently or other users are doing the same operation. Please retry after 15 seconds.";
      break;
    case -46:
      message =
        "Operating too frequently or other users are doing the same operation. Please retry after 15 seconds.";
      break;
    case -47:
      message = "No permission";
      break;
    case -50:
      message = "Command contains sensitive characters";
      break;
    case -251:
      message = "Another task is running now";
      break;
    case -57:
      message =
        "Operating too frequently, or other users are doing the same operation. Please retry after 60 seconds";
      break;
    case -68:
      message = "Login Restriction";
      break;
    case -69:
      message =
        "There is currently a conference going on. Changes cannot be applied at this time";
      break;
    case -70:
      message = "Login Forbidden";
      break;
    case -71:
      message = "The username doesn't exist";
      break;
    case -90:
      message = "The conference is busy, cannot be edited or deleted";
      break;
    case -98:
      message =
        "There are currently digital calls. Failed to apply configuration";
      break;
    default:
      message = `Unknown error: ${code}`;
      break;
  }
  return message;
};
