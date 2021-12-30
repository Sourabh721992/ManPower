import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../../Css/app.css";
import Login from "../Login/Login";
import Signup from "../Sign_up/Signup";
import Settings from "../Settings/Settings";

function App() {
  return (
    <>
      <Router>
        {/* <Header title="MANPOWER" searchBar={false} />{" "} */}
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Settings">
            <Settings />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
