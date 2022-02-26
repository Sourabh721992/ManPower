import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../../Css/app.css";
// import "../../Css/_app.scss"
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Settings from "../Settings/Settings";
import Dashboard from "../Dashboard/dashboard";
import PrivateRoute from "./privateRoute";
import Supplier from "../Supplier/Supplier";
import Profile from "../Profile/Profile";
import AddRequirement from "../Requirement/AddRequirement.js";
import SupplierDashboard from "../Dashboard/Supplier/SupplierDashboard";
import WorkerList from "../Worker/WorkerList";
import Worker from "../Worker/Worker"
import Requirement from "../Requirement/Requirement";
import MapWorker from "../Requirement/MapWorker"
import Buyer from "../Buyer/Buyer";
import AddNewBuyer from "../Buyer/AddNewBuyer";
import Header from "../Layout/Header";
import UserProfile from "../../utils/UserProfile";
import AddSupplier from "../Supplier/AddSupplier";
import { Toaster } from 'react-hot-toast'

function App() {
  var showHeader = true
  if(window.location.pathname === "/" && !UserProfile.isLoggedOn()){
    showHeader = false
  }
  return (
    <>
      <Router>
      <Toaster />
        {
          showHeader ?
            <Header /> : ""
        }
        
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
          <PrivateRoute exact path="/SupplierDashboard" component={SupplierDashboard} />
          <PrivateRoute exact path="/worker" component={WorkerList} />
          <PrivateRoute exact path="/buyer" component={Buyer} />
          <PrivateRoute exact path="/addBuyer" component={AddNewBuyer} />
          <PrivateRoute exact path="/addSupplier" component={AddSupplier} />
          <PrivateRoute exact path="/addWorker" component={Worker} />
          <PrivateRoute exact path="/requirement/:data" component={Requirement} />
          <PrivateRoute exact path="/mapWorker/:data" component={MapWorker} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
