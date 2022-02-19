import React, { Fragment, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AddBuyerUser } from '../../utils/ApiFunctions';
import { logger } from '../../utils/CommonList';
import UserProfile from '../../utils/UserProfile';
// import Header from '../Layout/Header'
// import Label from '../Controls/Label/Label';

export default function AddNewBuyer() {

  const [email, setEmail] = useState("")
  const session = UserProfile.getSession()
  const history = useHistory()

  const onSubmitBtn = (e) => {
    e.preventDefault();
    logger.log(email)


    let item = {};
    item.AuthorisedById = session.UserId
    item.Email = email

    AddBuyerUser(item)
      .then(() => {
        logger.log("buyer added....!")
        history.push('/buyer')
        setEmail("")
      })
  }

  return (
    <Fragment>
      {/* <Header /> */}
      <div className='d-flex justify-content-start'>
        <div className='vertical-divider'></div>
        <div className='add-buyer-form-div'>
          <h4 className='mt-4'>Add New Buyer</h4>
          <ValidationForm onSubmit={onSubmitBtn}>
            <Row className='form-group'>
              <Col sm={2}><h6 className='text-muted mt-4 f-24'>Email</h6></Col>
              <Col>
                <TextInput
                  id="add-buyer-email-text"
                  type="email"
                  name="buyerEmail"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  errorMessage={{ required: "Email is required", validator: "Please enter a valid email address" }}
                />

              </Col>
            </Row>
            <Row>
              <Col sm={{ offset:3 }} style={{marginTop:"20px"}}>
                <Button type="submit" variant='warning'>Insert</Button>
              </Col>
              <Col sm={8} style={{marginTop:"20px"}}>
                <Button variant='light' onClick={() => { history.push("/buyer")}}>Cancel</Button>
              </Col>
            </Row>
          </ValidationForm>

        </div>
      </div>
    </Fragment>
  )
}
