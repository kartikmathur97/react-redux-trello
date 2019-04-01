import { CONSTANTS } from "../actions";

const initialState = {
  "board-0": {
    id: "board-0",
    lists: ["list-0"],
    title: "Board 1"
  }
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const { boardID, id } = action.payload;
      const board = state[boardID];
      board.lists.push(`list-${id}`);
      return { ...state, [boardID]: board };
    }
    case CONSTANTS.DRAG_HAPPENED: {
      const { boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const { droppableIndexEnd, droppableIndexStart, type } = action.payload;
      if (type === "list") {
        const list = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...list);
        board.lists = lists;
        return { ...state, [boardID]: board };
      }
      return state;
    }
    case CONSTANTS.DELETE_LIST: {
      const { listID, boardID } = action.payload;
      const board = state[boardID];
      const newLists = board.lists.filter(id => id !== listID);
      return { ...state, [boardID]: { ...board, lists: newLists } };
    }
    case CONSTANTS.ADD_BOARD: {
      const { title, id } = action.payload;
      const newBoard = {
        id: [`board-${id}`],
        title,
        lists: []
      };
      return { ...state, [`board-${id}`]: newBoard };
    }
    default:
      return state;
  }
};

export default boardsReducer;
