import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../Css/app.css";
import Header from "../Layout/Header";
import Client from "../../utils/ApiClient";
import { Row, Col, Form, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsArrowRepeat } from "react-icons/bs";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [First_name, setFirstName] = useState("");
  const [Last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [Confirm_password, setConfirmPassword] = useState("");
  const [Org_name, setOrgName] = useState("");
  const [Mobile_number, setMobileNumber] = useState("");
  const [Role_name, setRole] = useState("");
  const history = useHistory();

  const Validate = async (e) => {
    e.preventDefault();
    let mobile = await Mobile_number;
    let Phone_number = await mobile.substr(-10, 10);
    let Email_ID = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
      email
    );

    //Validations
    if (Email_ID === false) {
      alert("Please enter correct email");
    } else if (First_name === "") {
      alert("Please enter first name");
    } else if (Last_name === "") {
      alert("Please enter last name");
    } else if (password === "") {
      alert("Please enter password");
    } else if (Confirm_password === "") {
      alert("Please enter confirm password");
    } else if (Org_name === "") {
      alert("Please enter organization name");
    } else if (Mobile_number === "" && Mobile_number.length) {
      alert("Please enter mobile number");
    } else if (Phone_number.length !== 10) {
      alert(`Mobile number should be 10 digits ${Phone_number}`);
    } else if (Role_name === "") {
      alert("Please select role");
    } else {
      let countryCode = await Mobile_number;
      let country_Code = await countryCode.slice(0, -10);
      let item = {
        Email: email,
        FirstName: First_name,
        LastName: Last_name,
        Password: password,
        Role: Role_name,
        OrgName: Org_name,
        MobileNo: Phone_number,
        CountryCode: country_Code,
      };
      Client.post("SignUp", item)  //Signup API Call
        .then((resData) => {
          console.warn("res", resData);
          history.push("/Login");
        })
        .catch((error) => {
          alert("catch error found", error);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="sign-up">
        <div className="first-main-container blue-300">
          <div className="inner-layout">
            <Row>
              <Col sm={12}>
                <div className="inner-layout-content">
                  <h5 className="black-600-text mb-4">Content to show</h5>
                  <p className="black-600-text">
                    Content 1 : Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </p>
                  <p className="black-600-text">
                    Content 2 : Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </p>
                  <p className="black-600-text">
                    Content 3 : Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="second-main-container">
          <h4 className="blue-900-text semibold mb-4">
            SIGN UP
            <span>
              Already have an account ?
              <Link to="/Login" className="red-text ms-1">
                SIGN IN
              </Link>
            </span>
          </h4>
          <Form.Group className="mb-1">
            <Row>
              <Col sm={12}>
                <InputGroup className="mb-3">
                  <Form.Label className="black-600-text">Email</Form.Label>
                  <FormControl
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <InputGroup className="mb-3">
                  <Form.Label className="black-600-text">First Name</Form.Label>
                  <FormControl
                    aria-label="First Name"
                    value={First_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col sm={6}>
                <InputGroup className="mb-3">
                  <Form.Label className="black-600-text">Last Name</Form.Label>
                  <FormControl
                    aria-label="Last Name"
                    value={Last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <InputGroup className="mb-3">
                  <Form.Label className="black-600-text">Password</Form.Label>
                  <FormControl
                    aria-label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col sm={6}>
                <InputGroup className="mb-3">
                  <Form.Label className="black-600-text">
                    Confirm Password
                  </Form.Label>
                  <FormControl
                    aria-label="Confirm Password"
                    value={Confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <InputGroup className="mb-3">
                  <Form.Label className="black-600-text">
                    Organisation Name
                  </Form.Label>
                  <FormControl
                    aria-label="Organisation Name"
                    value={Org_name}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={5}>
                <InputGroup className="mb-2">
                  <Form.Label className="black-600-text">Mobile No.</Form.Label>
                  <Row>
                    <Col xs={12} style={{ paddingLeft: 0 }}>
                      <InputGroup>
                        <PhoneInput
                          aria-label="mobile number"
                          className="form-control"
                          placeholder="Enter phone number"
                          value={Mobile_number}
                          onChange={setMobileNumber}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </InputGroup>
              </Col>
              <Col sm={7}>
                <InputGroup>
                  <Form.Label className="black-600-text">Role</Form.Label>
                  <Row style={{ width: "100%" }}>
                    <Col sm={5}>
                      <InputGroup className="mt-2 mb-3 black-600-text">
                        <InputGroup.Radio
                          name="Role"
                          aria-label="Radio button for following text input"
                          value={"Hire Workers"}
                          onChange={() => setRole("Hire Workers")}
                        />
                        Hire Workers
                      </InputGroup>
                    </Col>
                    <Col sm={7}>
                      <InputGroup className="mt-2 mb-3 black-600-text">
                        <InputGroup.Radio
                          name="Role"
                          aria-label="Radio button for following text input"
                          value={"Supply Workers"}
                          onChange={() => setRole("Supply Workers")}
                        />
                        Supply Workers
                      </InputGroup>
                    </Col>
                  </Row>
                </InputGroup>
              </Col>
            </Row>
          </Form.Group>
          <Row>
            <Col sm={12} style={{ textAlign: "center" }}>
              <button onClick={Validate} className="btn button">
                Register
              </button>
              <Link className="black-text semibold ms-4 refresh">
                <BsArrowRepeat className="refresh-icon" /> Refresh
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
