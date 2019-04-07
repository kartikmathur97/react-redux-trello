import { CONSTANTS } from "../actions";

const initialState = ["board-0"];

const boardOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {
      return [...state, `board-${action.payload.id}`];
    }
    case CONSTANTS.DELETE_BOARD: {
      const boardID = action.payload;
      return state.filter(id => id !== boardID);
    }
    default:
      return state;
  }
};

export default boardOrderReducer;
