import React from "react";
import MaterialCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import { Draggable } from "react-beautiful-dnd";
import { deleteCard } from "../actions";
import { connect } from "react-redux";

const Card = React.memo(({ text, id, listID, index, dispatch }) => {
  const handleDeleteCard = e => {
    dispatch(deleteCard(id, listID));
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="CardContainer"
          >
            <MaterialCard>
              <Icon
                className="DeleteButton"
                onMouseDown={handleDeleteCard}
                fontSize="small"
              >
                delete
              </Icon>
              <CardContent>
                <Typography gutterBottom>{text}</Typography>
              </CardContent>
            </MaterialCard>
          </div>
        )}
      </Draggable>
    );
  };

  return renderCard();
});

export default connect()(Card);
