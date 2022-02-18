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
import SupplierDashboard from "../Dashboard/Supplier/SupplierDashboard";
import WorkerList from "../Worker/WorkerList";
import Worker from "../Worker/Worker"

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
          <Route exact path="/worker">
            <WorkerList />
          </Route>
          <PrivateRoute exact path="/Dashboard" component={Dashboard} />
          <PrivateRoute exact path="/Supplier" component={Supplier} />
          <PrivateRoute exact path="/Profile" component={Profile} />
          <PrivateRoute exact path="/AddRequirement" component={AddRequirement} />
          <PrivateRoute exact path="/SupplierDashboard" component={SupplierDashboard} />
          <PrivateRoute exact path="/worker" component={WorkerList} />
          <PrivateRoute exact path="/addWorker" component={Worker} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
