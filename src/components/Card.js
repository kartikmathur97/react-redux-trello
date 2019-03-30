import React, { useState } from "react";
import MaterialCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Textarea from "react-textarea-autosize";
import { Draggable } from "react-beautiful-dnd";
import { deleteCard, editCard } from "../actions";
import { connect } from "react-redux";

const Card = React.memo(({ text, desc, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);
  const [cardDesc, setDesc] = useState(desc);

  const handleDeleteCard = e => {
    dispatch(deleteCard(id, listID));
  };

  const closeForm = e => {
    setIsEditing(false);
  };

  const handleTitleChange = e => {
    setText(e.target.value);
  };

  const handleDescChange = e => {
    setDesc(e.target.value);
  };

  const saveCard = e => {
    e.preventDefault();
    dispatch(editCard(id, listID, cardText, cardDesc));
    setIsEditing(false);
  };

  const renderEditForm = () => {
    return (
      <div>
        <MaterialCard className="CardContainer input">
          <Textarea
            className="Textarea"
            placeholder="Enter card title"
            autoFocus
            value={cardText}
            onChange={handleTitleChange}
            onFocus={function(e) {
              var val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
          />
          <hr />
          <Textarea
            className="Textarea Desc"
            placeholder="Enter card description"
            onBlur={closeForm}
            value={cardDesc}
            onChange={handleDescChange}
          />
        </MaterialCard>
        <div className="AddCloseButton">
          <Button
            className="AddButton"
            onMouseDown={saveCard}
            variant="contained"
          >
            Save
          </Button>
          <Icon
            className="CloseButton"
            onMouseDown={closeForm}
            fontSize="small"
          >
            close
          </Icon>
        </div>
      </div>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
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
              <Icon
                className="EditButton"
                onMouseDown={() => setIsEditing(true)}
                fontSize="small"
              >
                edit
              </Icon>
              <CardContent>
                <Typography className="Title" gutterBottom>
                  {text}
                </Typography>
                <div>
                  {desc ? (
                    <div>
                      <hr />
                      <Typography className="Description" gutterBottom>
                        {desc}
                      </Typography>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </MaterialCard>
          </div>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});

export default connect()(Card);
