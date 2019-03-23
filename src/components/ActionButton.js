import React from "react";
import Icon from "@material-ui/core/Icon";
import MaterialCard from "@material-ui/core/Card";
import Textarea from "react-textarea-autosize";
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
        text: ""
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
        desc: ""
      });
      dispatch(addCard(listID, text, desc));
    }
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";

    return (
      <div onClick={this.openForm} className="AddText">
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;

    const placeholder = list ? "Enter list title" : "Enter card title";

    const buttonTitle = list ? "Add List" : "Add Card";

    return (
      <div>
        <MaterialCard className="CardContainer input">
          <Textarea
            className="Textarea"
            placeholder={placeholder}
            autoFocus
            value={this.state.text}
            onChange={this.handleTitleChange}
          />
          <div>
            {list ? null : (
              <div>
                <hr />
                <Textarea
                  className="Textarea Desc"
                  placeholder="Enter card description"
                  value={this.state.desc}
                  onBlur={this.closeForm}
                  onChange={this.handleDescChange}
                />
              </div>
            )}
          </div>
        </MaterialCard>
        <div>
          <Button
            className="AddButton"
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            variant="contained"
          >
            {buttonTitle}
          </Button>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default connect()(ActionButton);
