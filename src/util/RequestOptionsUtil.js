// Creates a comma separated list of extensions/numbers from userCaller and userExtGroup
const userCallerCreate = (userExtGroup, userCaller, humanReadable = false) => {
  // If there is a extension group selected
  if (userExtGroup.length > 0) {
    // Removes all whitespace from callerArr then splits string on comma (,) to create an array
    let callerArr = userCaller.replace(/\s/g, "").split(",");
    // Spreads callerArr into new array using Set constructor
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    // Set objects are collections of values. A value in the Set may only occur once; it is unique in the Set's collection
    let callerArrUniq = [...new Set(callerArr)];

    // Removes all whitespace from extArr then splits string on comma (,) to create an array
    let extArr = userExtGroup.replace(/\s/g, "").split(",");

    // Filters callerArr against extArr removing duplicates
    let arr = callerArrUniq.filter((val) => {
      return extArr.indexOf(val) == -1;
    });
    // Combines extArr and arr (which contains none duplicate entries filtered from callerArr)
    callerArrUniq = [...extArr, ...arr];

    // Returns filtered arr of extensions joined as a comma seperated string
    // Also removes trailing comma(s) and any whitespace
    return callerArrUniq.join(humanReadable ? ", " : ",").replace(/,\s*$/, "");
    // If an extension group hasnt been selected then just use the Caller textfield
  } else {
    // Removes all whitespace from callerArr then splits string on comma (,) to create an array
    let callerArr = userCaller.replace(/\s/g, "").split(",");
    // Spreads callerArr into new array using Set constructor
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    // Set objects are collections of values. A value in the Set may only occur once; it is unique in the Set's collection
    let callerArrUniq = [...new Set(callerArr)];

    // Returns arr of extensions joined as a comma seperated string
    // Also removes trailing comma(s) and any whitespace
    return callerArrUniq.join(humanReadable ? ", " : ",").replace(/,\s*$/, "");
  }
};

// Creates a comma separated list of extensions/numbers from userCallee
const userCalleeCreate = (userCallee, humanReadable = false) => {
  // Removes all whitespace from callerArr then splits string on comma (,) to create an array
  let calleeArr = userCallee.replace(/\s/g, "").split(",");
  // Spreads callerArr into new array using Set constructor
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  // Set objects are collections of values. A value in the Set may only occur once; it is unique in the Set's collection
  let calleeArrUniq = [...new Set(calleeArr)];

  // Returns arr of extensions joined as a comma seperated string
  // Also removes trailing comma(s) and any whitespace
  return calleeArrUniq.join(humanReadable ? ", " : ",").replace(/,\s*$/, "");
};

// Creates a comma separated list of extensions/numbers from userAnsweredBy
const userAnsweredByCreate = (userAnsweredBy, humanReadable = false) => {
  // Removes all whitespace from callerArr then splits string on comma (,) to create an array
  let answeredByArr = userAnsweredBy.replace(/\s/g, "").split(",");
  // Spreads callerArr into new array using Set constructor
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  // Set objects are collections of values. A value in the Set may only occur once; it is unique in the Set's collection
  let answeredByArrUniq = [...new Set(answeredByArr)];

  // Returns arr of extensions joined as a comma seperated string
  // Also removes trailing comma(s) and any whitespace
  return answeredByArrUniq
    .join(humanReadable ? ", " : ",")
    .replace(/,\s*$/, "");
};

const requestOptionsUtil = {
  userCallerCreate: userCallerCreate,
  userCalleeCreate: userCalleeCreate,
  userAnsweredByCreate: userAnsweredByCreate,
};

export default requestOptionsUtil;
