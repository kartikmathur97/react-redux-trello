import React, { PureComponent } from "react";
import "./App.css";
import Routes from "./routes";

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <h2>React-Redux Mini Project</h2>
        <Routes />
      </div>
    );
  }
}

export default App;
