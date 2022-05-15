import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import "../../Css/app.css";
// import Header from "../Layout/Header";
import { SignupAPI } from "../../utils/ApiFunctions";
import { Row, Col, Form, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { BsArrowRepeat } from "react-icons/bs";
import PhoneInput, { isValidPhoneNumber, getCountryCallingCode } from "react-phone-number-input";
// import SuccessAlert from "../Controls/alert/successAlert";
import validator from "validator";
import { Radio, TextInput, ValidationForm } from "react-bootstrap4-form-validation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [First_name, setFirstName] = useState("");
  const [Last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [Confirm_password, setConfirmPassword] = useState("");
  const [Org_name, setOrgName] = useState("");
  const [Mobile_number, setMobileNumber] = useState("");
  const [CountryCode, setContryCode] = useState('91');
  const [Role_name, setRole] = useState("B");
  // const [validated, setValidated] = useState({ allValidate: false, mobileValidate: null });
  const history = useHistory();
  // const [showAlert, SetAlert] = useState({ show: false, isDataSaved: false, message: "" });
  const [contactValidated, setContactValidated] = useState(null);

  // const onChangeMobileNumber = (e) => {
  //   setMobileNumber(e.target.value)
  //   setValidated({ allValidate: validated.allValidate, mobileValidate: true })
  // }


  const onSubmit = (e) => {
    e.preventDefault();

    if (Mobile_number.trim() === "") {
      let setContactValidatedCopy = contactValidated
      setContactValidatedCopy = false
      setContactValidated(setContactValidatedCopy)
      return
    }

    let ContactNo = Mobile_number.replace("+"+CountryCode, "")

    let item = {
      Email: email.toLocaleLowerCase(),
      FirstName: First_name,
      LastName: Last_name,
      Password: password,
      Role: Role_name,
      OrgName: Org_name,
      MobileNo: ContactNo,
      CountryCode: CountryCode,
    };

    SignupAPI(item).then
      ((resData) => {
        console.warn("res", resData);

        // SetAlert({ show: true, isDataSaved: true, message: resData.Message });

        setTimeout(function (item) {
          // SetAlert({ show: false, isDataSaved: false, message: "" });
          history.push("/");
        }, 1500)


      }).catch((error) => {
        // alert("catch error found", error);

        // SetAlert({ show: true, isDataSaved: true, message: error.Message });

        // setTimeout(function (item) {
        //   SetAlert({ show: false, isDataSaved: false, message: "" });
        // }, 1500)

      })
  }

  const matchPassword = (value) => {
    return value && value === password;
  }

  const handleContactNo = (value) => {
    if (value) {
      setMobileNumber(value)
      if (isValidPhoneNumber(value)) {
        setContactValidated(true)
      }
      else {
        setContactValidated(false)
      }
    }
  }

  const handleCountryChange = (value) => {
    if (value) {

      setContryCode(getCountryCallingCode(value))

    }
  }

  return (
    <>
      {/* <Header /> */}
      <div className="sign-up">
        <div className="first-main-container blue-300">
          <div className="inner-layout">
            <Row>
              <Col sm={12}>
                <div className="inner-layout-content">
                <div class="d-flex flex-row bd-highlight">
                  {/* <div class="bd-highlight">
                    <Image src="./logo.jpg"/>
                  </div> */}
                  <div class="p-1 bd-highlight">
                    <h4 className="blue-900-text mb-4 mt-3">Features</h4>
                  </div>
                </div>
                 
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm ={12}>
              <div className="inner-info-layout"> 
                  <ul className="blue-900-text light">
                    <li className="h6 mb-3">
                    Connecting job posters and worker suppliers around the globe.
                    </li>
                    <li className="h6 mb-3">
                      Real-time tracking of worker's application status.
                    </li>
                    <li className="h6 mb-3">
                      Our tools aimed to reduce manual efforts and thereby increase productivity in procuring workers.
                    </li>
                    <li className="h6 mb-3">
                      Skilled in providing excellent resources based on the requirement.
                    </li>
                    <li className="h6 mb-3">
                      Different subscription models are available. Request you to connect with the support team.
                    </li>
                  </ul>
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

          <ValidationForm onSubmit={onSubmit}>
            <Row className='form-group'>
              <Col sm={6}>
                <label className="col-form-label font-weight-bolder" >Email<span style={{ color: 'red' }}>*</span></label>
                <TextInput
                  id="emailId"
                  type="email"
                  name="email"
                  className="form-control w-100"
                  placeholder="Enter Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                  required
                  validator={validator.isEmail}
                  errorMessage={{
                    validator: "Please enter valid email address",
                    required: "Please enter email address"
                  }}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <label className="col-form-label font-weight-bolder" >First Name<span style={{ color: 'red' }}>*</span></label>
                <TextInput
                  id="fname-input"
                  name="First_name"
                  type="text"
                  placeholder="Enter Your First Name"
                  className="form-control w-100"
                  onChange={(e) => setFirstName(e.target.value)}
                  defaultValue={First_name}
                  required
                  errorMessage={{
                    required: "Please enter first name"
                  }}

                />
              </Col>
              <Col>
                <label className="col-form-label font-weight-bolder" >Last Name<span style={{ color: 'red' }}>*</span></label>
                <TextInput
                  id="lname-input"
                  name="Last_name"
                  type="text"
                  placeholder="Enter Your last Name"
                  className="form-control w-100"
                  onChange={(e) => setLastName(e.target.value)}
                  defaultValue={Last_name}
                  required
                  errorMessage={{
                    required: "Please enter last name",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <label className="col-form-label font-weight-bolder" >Password<span style={{ color: 'red' }}>*</span></label>
                <TextInput
                  id="password-input"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="form-control w-100"
                  onChange={(e) => setPassword(e.target.value)}
                  defaultValue={password}
                  required
                  pattern="(?=.*[A-Z]).{6,}"
                  errorMessage={{ required: "Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter" }}
                  autoComplete="off"
                />
              </Col>
              <Col>
                <label className="col-form-label font-weight-bolder" >Confirm Password<span style={{ color: 'red' }}>*</span></label>
                <TextInput
                  id="cpassword-input"
                  name="Confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control w-100"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  defaultValue={Confirm_password}
                  required
                  validator={matchPassword}
                  errorMessage={{ required: "Confirm password is required", validator: "Password does not match" }}
                  autoComplete="off"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <label className="col-form-label font-weight-bolder" >Organization Name<span style={{ color: 'red' }}>*</span></label>
                <TextInput
                  id="orgname-input"
                  name="Org_name"
                  type="text"
                  placeholder="Enter Organization Name"
                  className="form-control w-100"
                  onChange={(e) => setOrgName(e.target.value)}
                  defaultValue={Org_name}
                  required
                  errorMessage={{ required: "Organization name is required" }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <label className="col-form-label font-weight-bolder" >Mobile No.<span style={{ color: 'red' }}>*</span></label>
                <PhoneInput
                  name="ContactNo"
                  aria-label="mobile number"
                  className="form-control w-100"
                  placeholder="Enter phone number"
                  // value={basicDetails.ContactNo}
                  onChange={handleContactNo}
                  onCountryChange={handleCountryChange}
                  defaultCountry={"IN"}
                  international
                  required
                  countryCallingCodeEditable={false}
                // error={basicDetails.ContactNo ? (isValidPhoneNumber(basicDetails.ContactNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
                // rules={{ required: true }}
                // style={{ borderColor: validated.mobileValidate == null ? "#ced4da" : validated.mobileValidate === true ? "red" : "green" }}
                />
                {contactValidated === false ?
                  <small className='text-danger'>
                    Please enter valid contact no.
                  </small>
                  :
                  null
                }
              </Col>
              <Col className="d-flex align-items-center">
                <Radio.RadioGroup name="Role_name" required valueSelected={Role_name}
                  onChange={(e) => setRole(e.target.value)}>
                  <Radio.RadioItem id="B" label="Hire Workers" value="B" />
                  <Radio.RadioItem id="S" label="Supply Workers" value="S" />
                </Radio.RadioGroup>
              </Col>
            </Row>

            <Row className='mt-5'>
              <Col className='d-flex justify-content-end'>
                {/* <SuccessAlert show={showAlert.show} message={showAlert.message} variant={showAlert.isDataSaved === true ? "success" : "danger"} /> */}
                <Button type="submit" variant="primary">Register</Button>
              </Col>
            </Row>
          </ValidationForm>
          
        </div>
      </div>
    </>
  );
}
