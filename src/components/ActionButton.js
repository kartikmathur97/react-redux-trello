import React from "react";
import Icon from "@material-ui/core/Icon";
import MaterialCard from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class ActionButton extends React.Component {
  state = {
    formOpen: false,
    text: "",
    desc: ""
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

  handleTitleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleDescChange = e => {
    this.setState({
      desc: e.target.value
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: "",
        formOpen: false
      });
      dispatch(addList(text));
    }

    return;
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text, desc } = this.state;

    if (text) {
      this.setState({
        text: "",
        desc: "",
        formOpen: false
      });
      dispatch(addCard(listID, text, desc));
    }
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Add new list" : "Add new card";

    const addTextStyle = list ? "AddText list" : "AddText card";

    return (
      <div onClick={this.openForm} className={addTextStyle}>
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;

    const buttonTitle = list ? "Add List" : "Add Card";

    const cardStyle = list
      ? "CardContainer input list"
      : "CardContainer input card";

    return (
      <div>
        <MaterialCard className={cardStyle}>
          <TextField
            className="Textarea"
            margin="normal"
            label="Title"
            autoFocus
            value={this.state.text}
            onChange={this.handleTitleChange}
          />
          <div>
            {list ? null : (
              <div>
                <hr />
                <TextField
                  className="Textarea Desc"
                  margin="normal"
                  label="Description"
                  value={this.state.desc}
                  onBlur={this.closeForm}
                  onChange={this.handleDescChange}
                />
              </div>
            )}
          </div>
        </MaterialCard>
        <div className="AddCloseButton">
          <Button
            className="AddButton"
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            variant="contained"
          >
            {buttonTitle}
          </Button>
          <Icon
            className="CloseButton"
            onMouseDown={this.closeForm}
            fontSize="small"
          >
            close
          </Icon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default connect()(ActionButton);
