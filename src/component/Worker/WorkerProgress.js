import React, {Fragment, useState, useEffect} from 'react'
import { Row, Col, Tab, Card, Nav } from 'react-bootstrap'
import {FetchWorkerProgressApi, UpdateWorkerProgressApi} from '../../utils/ApiFunctions'
import { withRouter } from 'react-router-dom'
// import UserProfile from '../../utils/UserProfile'
import Selection from './Selection'
import Pcc from './Pcc'
import Flight from './Flight'
import DocDetails from './DocDetails'
import { decodeBase64, encodeBase64 } from '../../utils/CommonList'
// import Header from '../Layout/Header'

const WorkerProgress = (props) => {

    // const session = UserProfile.getSession()

    const [activeTab, setActiveTab] = useState("selection")
    const [workerProgressInfo, setWorkerProgressInfo] = useState({
        WorkerCode: '',
        RequirementCode: ''
    })

    useEffect(() => {
        let workerProgressInfoCopy = Object.assign({}, workerProgressInfo);
        let data
        if (props.match && props.match.params && props.match.params.data) {
            data = JSON.parse(decodeBase64(props.match.params.data))
            if (data && data.requirementId) {
                if (data.requirementId) {
                    workerProgressInfoCopy.RequirementCode = data.requirementId
                }
                if (data.workerCode) {
                    workerProgressInfoCopy.WorkerCode = data.workerCode
                }
            }
            setWorkerProgressInfo(workerProgressInfoCopy)
        }

        const Body = {
            workerCode: workerProgressInfoCopy.WorkerCode
        }

        FetchWorkerProgressApi(Body)
        .then((resp) => {
            if(resp.Code === 1 && resp.Message !== "null" ){
                var data = JSON.parse(resp.Message)
                workerProgressInfoCopy = {
                    ...data,
                    ...workerProgressInfoCopy 
                    }

                setWorkerProgressInfo(workerProgressInfoCopy)
            }
        })

    }, [])
    

    // on select tab
    const changeTab = (tabKey) => {
        setActiveTab(tabKey)
    }

    const updateFromChild = (data, action, tabKey) => {
        let workerProgressInfoCopy = Object.assign({}, workerProgressInfo);
        if(action && data){
            workerProgressInfoCopy = {...workerProgressInfoCopy, ...data}

            setWorkerProgressInfo(workerProgressInfoCopy)

            if(action === "update-progress-api"){
                // call save worker API
                UpdateWorkerProgressApi(workerProgressInfoCopy)
                .then(() => {
                    var Data = encodeBase64({ requirementId: workerProgressInfoCopy.RequirementCode  });
                    props.history.push("/requirement/" + Data)
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
                                    <Nav.Link eventKey="selection">
                                        Selection
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="pcc">
                                        PCC
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="flight">
                                        Flight
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="doc">
                                        Document
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card>
                    </Col>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="selection">
                                <Selection workerData={workerProgressInfo} handleOnChange={updateFromChild}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="pcc">
                                <Pcc workerData={workerProgressInfo} handleOnChange={updateFromChild}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="flight">
                                <Flight workerData={workerProgressInfo} handleOnChange={updateFromChild}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="doc">
                                <DocDetails workerData={workerProgressInfo} handleOnChange={updateFromChild}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Fragment>
    )
} 

export default withRouter(WorkerProgress)