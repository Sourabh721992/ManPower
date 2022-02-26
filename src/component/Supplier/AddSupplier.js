import React, { Fragment, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { AddSupplierApi } from '../../utils/ApiFunctions'
import { logger } from '../../utils/CommonList'
import UserProfile from '../../utils/UserProfile'
// import Header from '../Layout/Header'

export default function AddSupplier() {
    const [email, setEmail] = useState("")
    const session = UserProfile.getSession()
    const history = useHistory()
  
    const onSubmitBtn = (e) => {
      e.preventDefault();
      logger.log(email)
  
  
      let item = {};
      item.AuthorisedById = session.UserId
      item.Email = email

      // console.log(item);
      AddSupplierApi(item).then
          ((resData) => {
              console.log("Supplier Added Successfully", resData);
              // SetAlert({ show: true, isDataSaved: true, message: resData.Message });
              history.push("/Supplier")
              
          }).catch((error) => {
              //alert("catch error found Supplier in Dashboard", JSON.stringify(error));
              // SetAlert({ show: true, isDataSaved: false, message: error.Message });
          })
    }
  
    return (
      <Fragment>
        {/* <Header /> */}
        <div className='d-flex justify-content-start'>
          <div className='vertical-divider'></div>
          <div className='add-buyer-form-div'>
            <h4 className='mt-4'>Add New Supplier</h4>
            <ValidationForm onSubmit={onSubmitBtn}>
              <Row className='form-group'>
                <Col sm={2}><h6 className='text-muted mt-4 f-24'>Email</h6></Col>
                <Col sm= {10}>
                  <TextInput
                    id="add-supplier-email-text"
                    type="email"
                    name="supplierEmail"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    errorMessage={{ required: "Email is required", validator: "Please enter a valid email address" }}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm={2}></Col>
                <Col sm={5}>
                    <div className="d-flex justify-content-end">
                      <div>
                        <Button variant="secondary" onClick={() => { history.push("/Supplier")}}>Cancel</Button>
                      </div>
                      <div style={{marginLeft:"15px"}}>
                        <Button type="submit" className="btn btn-primary">Add</Button>
                      </div>
                    </div>
                </Col>
              </Row>
            </ValidationForm>
  
          </div>
        </div>
      </Fragment>
    )
}
