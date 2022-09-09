import { debug } from "../consts/debug";

export const parseProductValue = (value: string): string[] => {
  debug && console.log(value);
  let verify = value.replaceAll(".", ",");
  debug && console.log(verify);
  const temp: string[] = [""];
  let comma = verify.indexOf(",");
  debug && console.log(comma);
  if (comma !== -1) {
    temp[0] = verify.slice(0, comma);
    temp[1] = verify.substring(comma);
  } else {
    temp[0] = value;
    temp[1] = ",00";
  }

  return temp;
};
