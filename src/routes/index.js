import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Board from "../components/Board";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/:boardID" component={Board} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
