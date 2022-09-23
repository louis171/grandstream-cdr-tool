import { titleCase, makeString } from "../functions/functions";

const callTypeDispositionCreate = (arr) => {

  let optionsArr = arr.map((option) => {
    return titleCase(option);
  });

  let optionsString = makeString(optionsArr);

  return `${optionsString} calls`;
};

export default callTypeDispositionCreate;
