import React, { PureComponent } from "react";
import "./App.css";
import List from "./components/List";
import { connect } from "react-redux";
import ActionButton from "./components/ActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "./actions";

class App extends PureComponent {
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
    const { lists } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <h2>React-Redux Mini Project</h2>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <div
                className="ListContainer"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((list, index) => (
                  <List
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                  />
                ))}
                <ActionButton list />
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
