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
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [organisationname, setOrganisationName] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [radio, setRadioBtn] = useState("");
  const history = useHistory();

  const Validate = async (e) => {
    e.preventDefault();

    let mobile = await mobilenumber;
    let phone_number = await mobile.substr(-10, 10);
    let Email_ID = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
      email
    );

    //Validations
    if (Email_ID === false) {
      alert("Please enter correct email");
    } else if (firstname === "") {
      alert("Please fill firstname");
    } else if (lastname === "") {
      alert("Please fill lastname");
    } else if (password === "") {
      alert("Please fill password");
    } else if (confirmpassword === "") {
      alert("Please fill confirm password");
    } else if (organisationname === "") {
      alert("Please fill organisation name");
    } else if (mobilenumber === "" && mobilenumber.length) {
      alert("Please fill mobile number");
    } else if (phone_number.length !== 10) {
      alert(`Mobile number should be 10 digits ${phone_number}`);
    } else if (radio === "") {
      alert("Please fill role");
    } else {
      let countryCode = await mobilenumber;
      let country_Code = await countryCode.slice(0, -10);

      //API CALLS
      let item = {
        email,
        firstname,
        lastname,
        password,
        confirmpassword,
        organisationname,
        phone_number,
        country_Code,
      };
      Client.post("SignUp", item) //Signup API Call
        .then((resData) => {
          alert(resData);
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
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col sm={6}>
                <InputGroup className="mb-3">
                  <Form.Label className="black-600-text">Last Name</Form.Label>
                  <FormControl
                    aria-label="Last Name"
                    value={lastname}
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
                    value={confirmpassword}
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
                    value={organisationname}
                    onChange={(e) => setOrganisationName(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={5}>
                <InputGroup className="mb-2">
                  <Form.Label className="black-600-text">Mobile No.</Form.Label>
                  <Row>
                    {/* <Col xs={2} style={{ paddingLeft: 0 }}>
                        <InputGroup>
                          <FormControl aria-label="mobile number" />
                        </InputGroup>
                      </Col> */}
                    <Col xs={12} style={{ paddingLeft: 0 }}>
                      <InputGroup>
                        <PhoneInput
                          aria-label="mobile number"
                          className="form-control"
                          placeholder="Enter phone number"
                          value={mobilenumber}
                          onChange={setMobileNumber}
                        />
                        {/* <FormControl 
                            aria-label="mobile number"
                            value={mobilenumber} 
                            onChange={(e)=>setMobileNumber(e.target.value)} /> */}
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
                          onChange={() => setRadioBtn("Hire Workers")}
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
                          onChange={() => setRadioBtn("Supply Workers")}
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
              {/* <Button onClick={signUp} name={"Register"} /> */}
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
