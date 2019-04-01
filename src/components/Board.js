import React, { PureComponent } from "react";
import List from "./List";
import { connect } from "react-redux";
import ActionButton from "./ActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, setActiveBoard } from "../actions";

class Board extends PureComponent {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists, cards, match, boards } = this.props;
    const { boardID } = match.params;
    this.props.dispatch(setActiveBoard(boardID));
    const board = boards[boardID];
    if (!board) {
      return <h2 className="App h2 BoardTitle">Board does not exist!</h2>;
    }
    const listOrder = board.lists;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h2 className="App h2 BoardTitle">{board.title}</h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <div
              className="ListContainer"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                if (list) {
                  const listCards = list.cards.map(cardID => cards[cardID]);
                  return (
                    <List
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
              })}
              {provided.placeholder}
              <ActionButton list />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards
});

export default connect(mapStateToProps)(Board);
