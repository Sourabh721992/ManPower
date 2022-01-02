import React, { useState } from "react";
import "../../Css/app.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
import Client from "../../utils/ApiClient";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const Validate = async (e) => {
    e.preventDefault();
    let username = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
      email
    );
    //Validations
    if (username === false || password === "") {
      alert("Please enter valid Username & Password");
    } else {
      let item = {
        Email: email,
        Password: password,
      };
      Client.post("LogIn", item) //Login API Call
        .then((resData) => {
          console.warn("res", resData);
          history.push("/Login");
        })
        .catch((error) => {
          console.warn("catch error found", error);
        });
    }
  };
  return (
    <div>
      <div className="main-container">
        <div className="first-main-container blue">
          <div className="inner-layout">
            <Row>
              <Col sm={12}>
                <Image src="./logo.jpg" />
              </Col>
              <Col sm={12}>
                <div className="inner-layout-content">
                  <h2 className="blue-text">
                    Find premium quality solutions in software - with the best
                    minds in the industry
                  </h2>
                  <p className="grey-text">Landing page *.png, *.html</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="second-main-container">
          <h2 className="blue-900-text mb-4">Welcome to HRV7</h2>
          <h4 className="blue-900-text light mb-4">SIGN IN</h4>
          <Form>
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
                />
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <BsFillKeyFill className="key" />
                </InputGroup.Text>
                <FormControl
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <button onClick={Validate} className="btn button">
              Log-In
            </button>
            <Col sm={12} className="mb-4 mt-4">
              <h6>
                Forgot Password ? <Link to="">Click here</Link>
              </h6>
            </Col>
            <Col sm={12}>
              <h5>
                New to manV?{" "}
                <Link to="" className="red-text">
                  SIGN UP
                </Link>{" "}
                now
              </h5>
            </Col>
          </Form>
        </div>
      </div>
    </div>
  );
}
