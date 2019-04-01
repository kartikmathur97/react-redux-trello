import { CONSTANTS } from "../actions";
import { v4 } from "uuid";

export const addBoard = title => {
  const id = v4();
  return {
    type: CONSTANTS.ADD_BOARD,
    payload: { title, id }
  };
};

export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};
