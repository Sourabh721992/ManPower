import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../Css/app.css";
import Header from "../Layout/Header";
import { SignupAPI } from "../../utils/ApiFunctions";
import { Row, Col, Form, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsArrowRepeat } from "react-icons/bs";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import SuccessAlert from "../Controls/alert/successAlert";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [First_name, setFirstName] = useState("");
  const [Last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [Confirm_password, setConfirmPassword] = useState("");
  const [Org_name, setOrgName] = useState("");
  const [Mobile_number, setMobileNumber] = useState("");
  const [Role_name, setRole] = useState("B");
  const [validated, setValidated] = useState({ allValidate: false, mobileValidate: null });
  const history = useHistory();
  const [showAlert, SetAlert] = useState({ show: false, isDataSaved: false, message: "" });

  // const onChangeMobileNumber = (e) => {
  //   setMobileNumber(e.target.value)
  //   setValidated({ allValidate: validated.allValidate, mobileValidate: true })
  // }

  const Validate = async (e) => {
    e.preventDefault();
    let mobile = await Mobile_number;
    let Phone_number = "";
    if (mobile)
      Phone_number = await mobile.substr(-10, 10);
    let Email_ID = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
      email
    );

    let mobileValidationDisplay = null;

    //Validations
    if (Email_ID === false || First_name === "" || Last_name === "" || password === "" || Confirm_password === "" || Org_name === "" || (Mobile_number === "") || Role_name === "") {

      if (!Mobile_number) {
        mobileValidationDisplay = true;
      }
      else {
        mobileValidationDisplay = false
      }

      setValidated({ allValidate: true, mobileValidate: mobileValidationDisplay })
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
      /*  Client.post("SignUp", item)  //Signup API Call
         .then((resData) => {
           console.warn("res", resData);
           history.push("/Login");
         })
         .catch((error) => {
           alert("catch error found", error);
         }); */

      SignupAPI(item).then
        ((resData) => {
          console.warn("res", resData);

          SetAlert({ show: true, isDataSaved: true, message: resData.Message });

          setTimeout(function (item) {
            SetAlert({ show: false, isDataSaved: false, message: "" });
            history.push("/");
          }, 1500)


        }).catch((error) => {
          alert("catch error found", error);

          SetAlert({ show: true, isDataSaved: true, message: error.Message });

          setTimeout(function (item) {
            SetAlert({ show: false, isDataSaved: false, message: "" });
          }, 1500)

        })
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
              <Link to="" className="red-text ms-1">
                SIGN IN
              </Link>
            </span>
          </h4>
          <Form noValidate validated={validated.allValidate} onSubmit={Validate}>
            <Form.Group className="mb-1">
              <Row>
                <Col sm={12}>
                  <InputGroup className="mb-3">
                    <Form.Label className="black-600-text">Email</Form.Label>
                    <FormControl
                      aria-label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Email
                    </Form.Control.Feedback>
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
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter First Name
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
                <Col sm={6}>
                  <InputGroup className="mb-3">
                    <Form.Label className="black-600-text">Last Name</Form.Label>
                    <FormControl
                      aria-label="Last Name"
                      value={Last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Last Name
                    </Form.Control.Feedback>
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
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Password
                    </Form.Control.Feedback>
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
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Confirm Password
                    </Form.Control.Feedback>
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
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Organization Name
                    </Form.Control.Feedback>
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
                            rules={{ required: true }}
                            style={{ borderColor: validated.mobileValidate == null ? "#ced4da" : validated.mobileValidate === true ? "red" : "green" }}
                          />
                          <Form.Control.Feedback id="MobileFeedback" type="invalid" style={{ display: validated.mobileValidate == null ? "none" : validated.mobileValidate === true ? "block" : "none" }}>
                            Please Enter Mobile Number
                          </Form.Control.Feedback>
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
                            value={"B"}
                            onChange={() => setRole("B")}
                            required
                            feedback="Please choose one"
                            feedbackType="invalid"
                            checked={Role_name === "B" ? true : false}
                          />
                          Hire Workers

                          <Form.Control.Feedback type="invalid">
                            Please choose one
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                      <Col sm={7}>
                        <InputGroup className="mt-2 mb-3 black-600-text">
                          <InputGroup.Radio
                            name="Role"
                            aria-label="Radio button for following text input"
                            value={"S"}
                            onChange={() => setRole("S")}
                            feedback="Please choose one"
                            feedbackType="invalid"
                            required
                            checked={Role_name === "S" ? true : false}
                          />
                          Supply Workers

                          <Form.Control.Feedback type="invalid">
                            Please choose one
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Row>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Col sm={12} style={{ textAlign: "center" }}>
                <button type="submit" className="btn button">
                  Register
                </button>
                <Link className="black-text semibold ms-4 refresh">
                  <BsArrowRepeat className="refresh-icon" /> Refresh
                </Link>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
              </Col>
              <Col sm={4} style={{ textAlign: "center" }}>
                <SuccessAlert show={showAlert.show} message={showAlert.message} variant={showAlert.isDataSaved === true ? "success" : "danger"} />
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}
