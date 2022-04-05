import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Body from "./components/body/Body";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Body />
      </div>
    </Router>
  );
}

export default App;
