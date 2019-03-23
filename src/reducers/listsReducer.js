import { CONSTANTS } from "../actions";
import { v4 } from "uuid";

let listID = v4();
let cardID = v4();

const initialState = [
  {
    title: "To do",
    id: `list-${v4()}`,
    cards: [
      {
        id: `card-${v4()}`,
        text: "first item to do"
      },
      {
        id: `card-${v4()}`,
        text: "second item to do"
      }
    ]
  },
  {
    title: "Done",
    id: `list-${v4()}`,
    cards: [
      {
        id: `card-${v4()}`,
        text: "first item done"
      },
      {
        id: `card-${v4()}`,
        text: "second item done"
      },
      {
        id: `card-${v4()}`,
        text: "third item done"
      }
    ]
  }
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`
      };
      listID = v4();
      return [...state, newList];
    }

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`
      };
      cardID = v4();

      const newState = state.map(list => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        } else {
          return list;
        }
      });

      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        // eslint-disable-next-line
        draggableId,
        type
      } = action.payload;
      const newState = [...state];
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find(list => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.find(list => droppableIdEnd === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;
    }

    case CONSTANTS.DELETE_CARD: {
      const { id, listID } = action.payload;
      return state.map(list => {
        if (list.id === listID) {
          const newCards = list.cards.filter(card => card.id !== id);
          return { ...list, cards: newCards };
        } else {
          return list;
        }
      });
    }

    case CONSTANTS.DELETE_LIST: {
      const listID = action.payload;
      console.log(listID);
      return state.filter(list => list.id !== listID);
    }

    default:
      return state;
  }
};

export default listsReducer;
