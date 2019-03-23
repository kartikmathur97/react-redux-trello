import { CONSTANTS } from "../actions";

export const addCard = (listID, text, desc) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, desc, listID }
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
