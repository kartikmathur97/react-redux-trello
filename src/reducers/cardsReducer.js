import { CONSTANTS } from "../actions";

const initialState = {
  "card-0": {
    text: "First Card",
    desc: "First Desc",
    id: `card-0`,
    list: "list-0"
  }
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      const { text, desc, listID, id } = action.payload;
      const newCard = {
        text: text,
        desc: desc,
        id: `card-${id}`,
        list: listID
      };
      return { ...state, [`card-${id}`]: newCard };
    }
    case CONSTANTS.EDIT_CARD: {
      const { id, newText, newDesc } = action.payload;
      const card = state[id];
      card.text = newText;
      card.desc = newDesc;
      return { ...state, [`card-${id}`]: card };
    }
    case CONSTANTS.DELETE_CARD: {
      const { id } = action.payload;
      delete state[id];
      return { ...state };
    }
    default:
      return state;
  }
};

export default cardsReducer;
