import React, {Fragment, useState} from 'react'
import { Row, Col, Tab, Card, Nav } from 'react-bootstrap'
import BasicInfo from './BasicInfo'
import ContactInfo from './ContactInfo'
import ExpertiseInfo from './ExpertiseInfo'
import {AddWorkerApi} from '../../utils/ApiFunctions'
import { withRouter } from 'react-router-dom'
import UserProfile from '../../utils/UserProfile'
// import Header from '../Layout/Header'

const Worker = (props) => {

    const session = UserProfile.getSession()

    const [activeTab, setActiveTab] = useState("basicInfo")
    const [workerInfo, setWorkerInfo] = useState({
        SupplierId: session.UserId
    })

    // on select tab
    const changeTab = (tabKey) => {
        setActiveTab(tabKey)
    }

    const updateFromChild = (data, action, tabKey) => {
        let workerInfoCopy = {...workerInfo}
        if(action && data){
            workerInfoCopy = {...workerInfoCopy, ...data}

            setWorkerInfo(workerInfoCopy)

            if(action === "save-worker-api-call"){
                // call save worker API
                AddWorkerApi(workerInfoCopy).then(() => {
                    props.history.push("/worker");
                })
            }
            
            if(tabKey){
                changeTab(tabKey)
            }
            
        }
    }


    return(
        <Fragment>
            
            {/* <Header session={session} /> */}

            <Tab.Container activeKey={activeTab}  /*onSelect={(k) => onSelectTab(k)}*/>
                <Row className="mx-5 m-5">
                    <Col sm={3}>
                        <Card className='shadow-sm'>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="basicInfo">
                                        Basic
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="contactInfo">
                                        Contact Details
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="expertiseInfo">
                                        Expertise
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card>
                    </Col>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="basicInfo">
                                <BasicInfo workerData={workerInfo} handleOnChange={updateFromChild}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="contactInfo">
                                <ContactInfo workerData={workerInfo} handleOnChange={updateFromChild}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="expertiseInfo">
                                <ExpertiseInfo workerData={workerInfo} handleOnChange={updateFromChild}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Fragment>
    )
} 

export default withRouter(Worker)