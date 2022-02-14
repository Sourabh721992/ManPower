import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../../Css/app.css";
import Login from "../Login/Login";
import Signup from "../Sign_up/Signup";
import Settings from "../Settings/Settings";
import Dashboard from "../Dashboard/dashboard";
import PrivateRoute from "./privateRoute";
import Supplier from "../Supplier/Supplier";
import Profile from "../Profile/Profile";
import AddRequirement from "../Requirement/AddRequirement.js";

function App() {
  return (
    <>
      <Router>
        {/* <Header title="MANPOWER" searchBar={false} />{" "} */}
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/Signup">
            <Signup />
          </Route>
          <Route exact path="/Settings">
            <Settings />
          </Route>
          <PrivateRoute exact path="/Dashboard" component={Dashboard} />
          <PrivateRoute exact path="/Supplier" component={Supplier} />
          <PrivateRoute exact path="/Profile" component={Profile} />
          <PrivateRoute exact path="/AddRequirement" component={AddRequirement} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
