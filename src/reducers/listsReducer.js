import { CONSTANTS } from "../actions";

const initialState = {
  "list-0": {
    id: "list-0",
    cards: ["card-0"],
    title: "First List",
    board: "board-0"
  }
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const { title, boardID, id } = action.payload;
      const newList = {
        title: title,
        cards: [],
        id: `list-${id}`,
        board: boardID
      };
      return { ...state, [`list-${id}`]: newList };
    }

    case CONSTANTS.ADD_CARD: {
      const { listID, id } = action.payload;
      const list = state[listID];
      list.cards.push(`card-${id}`);
      return { ...state, [listID]: list };
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type
      } = action.payload;
      if (type === "list") {
        return state;
      }
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [droppableIdStart]: list };
      }
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state[droppableIdStart];
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state[droppableIdEnd];
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd
        };
      }
      return state;
    }

    case CONSTANTS.DELETE_CARD: {
      const { id, listID } = action.payload;
      const list = state[listID];
      const newCards = list.cards.filter(cardID => cardID !== id);
      return { ...state, [listID]: { ...list, cards: newCards } };
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      delete state[listID];
      return { ...state };
    }

    default:
      return state;
  }
};

export default listsReducer;
