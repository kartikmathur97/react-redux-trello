import React from "react";
import Icon from '@material-ui/core/Icon';
import MaterialCard from '@material-ui/core/Card';
import Textarea from 'react-textarea-autosize';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class ActionButton extends React.Component {

    state = {
        formOpen: false,
        text: ""
    };

    openForm = () => {
        this.setState({
            formOpen: true
        });
    };

    closeForm = () => {
        this.setState({
            formOpen: false
        });
    };

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        });
    };

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState ({
                text: ""
            })
            dispatch(addList(text))
        }

        return;
    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState ({
                text: ""
            })
            dispatch(addCard(listID, text));
        }
    };

    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = list ? "Add another list" : "Add another card";

        return (
            <div onClick={this.openForm} className="AddText">
                <Icon>add_circle</Icon>
                <p>{buttonText}</p>
            </div>
        )
    };

    renderForm = () => {

        const { list } = this.props;

        const placeholder = list ? "Enter list title" : "Enter card title";

        const buttonTitle = list ? "Add List" : "Add Card";

        return (
            <div>
                <MaterialCard className="CardContainer input">
                    <Textarea className="Textarea" placeholder={placeholder} autoFocus onBlur={this.closeForm} value={this.state.text} onChange={this.handleInputChange} />
                </MaterialCard>
                <div>
                    <Button className="AddButton" onMouseDown={list ? this.handleAddList : this.handleAddCard } variant="contained">{buttonTitle}</Button>
                </div>
            </div>
        )
    };

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

export default connect()(ActionButton);