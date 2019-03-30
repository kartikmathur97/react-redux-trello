import React from "react";
import Card from "./Card";
import ActionButton from "./ActionButton";
import Icon from "@material-ui/core/Icon";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { deleteList } from "../actions";
import { connect } from "react-redux";

const List = React.memo(({ title, cards, listID, index, dispatch }) => {
  const handleListDelete = e => {
    dispatch(deleteList(listID));
  };

  const renderList = () => {
    return (
      <Draggable draggableId={String(listID)} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className="List"
          >
            <Icon
              className="DeleteButton"
              onMouseDown={handleListDelete}
              fontSize="small"
            >
              delete
            </Icon>
            <Droppable droppableId={String(listID)} type="card">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <h4>{title}</h4>
                  {cards.map((card, index) => (
                    <Card
                      key={card.id}
                      index={index}
                      text={card.text}
                      desc={card.desc}
                      id={card.id}
                      listID={listID}
                    />
                  ))}
                  {provided.placeholder}
                  <ActionButton listID={listID} />
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  };

  return renderList();
});

export default connect()(List);
