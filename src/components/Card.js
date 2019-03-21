import React from "react";
import MaterialCard from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Draggable } from "react-beautiful-dnd";

const Card = ({ text, id, index }) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="Card">
                    <MaterialCard >
                        <CardContent>
                            <DeleteOutlinedIcon className="DeleteButton" />
                            <Typography gutterBottom>
                                {text}
                            </Typography>
                        </CardContent>
                    </MaterialCard>
                </div>
            )}
        </Draggable>
    )
};

export default Card;