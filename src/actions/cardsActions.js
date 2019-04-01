import { CONSTANTS } from "../actions";
import { v4 } from "uuid";

export const addCard = (listID, text, desc) => {
  const id = v4();
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, desc, listID, id }
  };
};

export const editCard = (id, listID, newText, newDesc) => {
  return {
    type: CONSTANTS.EDIT_CARD,
    payload: { id, listID, newText, newDesc }
  };
};

export const deleteCard = (id, listID) => {
  return {
    type: CONSTANTS.DELETE_CARD,
    payload: { id, listID }
  };
};
