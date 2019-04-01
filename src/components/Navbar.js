import React, { useState } from "react";
import { connect } from "react-redux";
import { addBoard } from "../actions";
import { Link } from "react-router-dom";
import { AppBar, Tabs, Tab, Button, Popper, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";

const Navbar = ({ boards, boardOrder, dispatch }) => {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    if (newBoardTitle) {
      e.preventDefault();
      dispatch(addBoard(newBoardTitle));
      setFormOpen(false);
    }
  };

  const handleOpenAdd = event => {
    const { currentTarget } = event;
    setAnchorEl(currentTarget);
    setFormOpen(!formOpen);
  };

  const renderTabs = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];
      return (
        <Link
          key={boardID}
          to={`/${board.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Tab label={board.title} />
        </Link>
      );
    });
  };

  const renderBar = () => {
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            indicatorColor="primary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {renderTabs()}
            <Tab className="BoardAddIcon" icon={<AddIcon />} onMouseDown={handleOpenAdd} />
          </Tabs>
        </AppBar>
        <Popper open={formOpen} anchorEl={anchorEl} placement="bottom-start">
          <Paper className="AddBoardPaper" elevation="6">
            <TextField
              className="CreateBoardText"
              label="Board title"
              autoFocus
              onChange={handleChange}
            />
            <Button
              className="CreateBoardButton"
              onMouseDown={handleSubmit}
              variant="contained"
            >
              Create
            </Button>
          </Paper>
        </Popper>
      </div>
    );
  };

  return <div>{renderBar()}</div>;
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default connect(mapStateToProps)(Navbar);
