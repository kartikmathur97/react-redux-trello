import React from "react";
import Card from "./Card";
import ActionButton from "./ActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ title, cards, listID, index }) => {
    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} className="List">
                    <Droppable droppableId={String(listID)}>
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <h4>{title}</h4>
                                {cards.map((card, index) => (
                                    <Card key={card.id} index={index} text={card.text} id={card.id} />
                                ))}
                                {provided.placeholder}
                                <ActionButton listID={listID} />
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
};

export default List;