import { debug } from "../consts/debug";

export const checkSaleDateValidity = (start: Date, end: Date) => {
  const from = new Date(start);
  const to = new Date(end);
  const check = new Date();

  if (check >= from && check <= to) return true;
  return false;
};

export const dateFormate = (date: Date) => {
  const temp = new Date(date);
  return temp.toLocaleDateString("pt-br");
};
