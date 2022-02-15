import React, {Fragment, useState} from 'react'
import { Row, Col, Tab, Card, Nav } from 'react-bootstrap'
import BasicInfo from './BasicInfo'
import ContactInfo from './ContactInfo'
import ExpertiseInfo from './ExpertiseInfo'

const Worker = (props) => {

    const [activeTab, setActiveTab] = useState("basicInfo")
    const [workerInfo, setWorkerInfo] = useState({})

    // on select tab
    const changeTab = (tabKey) => {
        setActiveTab(tabKey)
    }

    const updateFromChild = (data, tabKey) => {
        let workerInfoCopy = {...workerInfo}
        if(data){
            workerInfoCopy = {...workerInfoCopy, data}

            setWorkerInfo(workerInfoCopy)
            changeTab(tabKey)
        }
    }


    return(
        <Fragment>
            <Tab.Container activeKey={activeTab} /*onSelect={(k) => onSelectTab(k)}*/>
                <Row>
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

export default Worker