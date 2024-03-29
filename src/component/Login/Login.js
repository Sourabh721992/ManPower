import React, { useState } from "react";
// import "../../Css/app.css";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserProfile from "../../utils/UserProfile";
import {
  Row,
  Col,
  Image,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillPersonFill, BsFillKeyFill } from "react-icons/bs";
import { LoginAPI } from "../../utils/ApiFunctions";
import { TradesApi } from "../../utils/ApiFunctions";
import {setTrade} from "../../utils/CommonList";
// import SuccessAlert from "../Controls/alert/successAlert";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();
  const [validated, setValidated] = useState(false);
  // const [showAlert, SetAlert] = useState({ show: false, isDataSaved: false, message: "" });

  const Validate = async (e) => {


    // const form = e.currentTarget;

    e.preventDefault();
    //e.stopPropagation();
    let username = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
      email
    );

    // // console.log("login called");

    //Validations
    if (username === false || password === "") {
      // // console.log("login called 1");
      setValidated(true);
    } else {
      // // console.log("login called 2");

      let item = {
        Email: email,
        Password: password,
      };

      TradesApi({}, true).then
        ((resData) => {
          setTrade(resData.Message, true);
        }).catch((error) => {
          alert("catch error found 1", error);
        })

      LoginAPI(item).then
        ((resData) => {
          // localStorage.setItem("LoginCredential", JSON.stringify(item));
          UserProfile.setSession(resData.Message, true);
          // // console.log("Login API success");
          // console.log(resData)
          let session = JSON.parse(resData.Message)
          if(session.Role === "S"){
            window.location.href= "/SupplierDashboard"
            // history.push("/SupplierDashboard");
          }else{
            window.location.href= "/Dashboard"
            // history.push("/Dashboard");
          }
          
        }).catch((error) => {
          //alert("catch error found 1", error);

          // SetAlert({ show: true, isDataSaved: false, message: error.Message });

          // setTimeout(function () {
          //   SetAlert({ show: false, isDataSaved: false, message: "" });
          // }, 2000);
        })
    }
  };
  return (
    <div>
      <div className="main-container">
        <div className="first-main-container blue">
          <div className="inner-layout">
            <div style={{marginTop:"30%"}}>
              <h4 className="blue-900-text">Connecting job posters and worker suppliers around the globe.</h4>
            </div>
          </div>
        </div>
        <div className="second-main-container">
          <h2 className="blue-900-text mb-4">Welcome to HRV7</h2>
          <h4 className="blue-900-text light mb-4">SIGN IN</h4>
          <Form noValidate validated={validated} onSubmit={Validate}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <BsFillPersonFill />
                </InputGroup.Text>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Please Enter Email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <BsFillKeyFill className="key" />
                </InputGroup.Text>
                <FormControl
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                Please Enter Password
              </Form.Control.Feedback>
            </Form.Group>
            {/*  <button onClick={Validate} className="btn button">
              Log-In
            </button> */}
            <button type="submit" className="btn button">Login</button>
            {/* <SuccessAlert show={showAlert.show} message={showAlert.isDataSaved === true ? "Login Successfully !" : showAlert.message} variant={showAlert.isDataSaved === true ? "success" : "danger"} /> */}
            {/* <Col sm={12} className="mb-4 mt-4">
              <h6>
                Forgot Password ? <Link to="">Click here</Link>
              </h6>
            </Col> */}
            <Col sm={12}>
              <h5 className ="mt-3">
                New to manV?{" "}
                <Link to="/Signup" className="red-text">
                  SIGN UP
                </Link>{" "}
                now
              </h5>
            </Col>
          </Form>
        </div>
      </div>
    </div >
  );
}
