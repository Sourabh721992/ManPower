import React, {Fragment, useState, useEffect} from 'react'
import { Row, Col, Tab, Card, Nav } from 'react-bootstrap'
import {FetchWorkerProgressApi, UpdateWorkerProgressApi} from '../../utils/ApiFunctions'
import { withRouter } from 'react-router-dom'
import UserProfile from '../../utils/UserProfile'
import Selection from './Selection'
import Pcc from './Pcc'
import Flight from './Flight'
import DocDetails from './DocDetails'
import { decodeBase64, encodeBase64 } from '../../utils/CommonList'
import { ErrorNotify, SuccessNotify } from '../Controls/Toast/Toast'
import { /*LightButton,*/ OutlinePrimaryButton } from '../Controls/Buttons/Buttons'
import { MdOutlineArrowBack } from 'react-icons/md'
import { Role } from '../../master-data'
// import Header from '../Layout/Header'

const WorkerProgress = (props) => {

    const session = UserProfile.getSession()

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
                    SuccessNotify("Worker Progress Updated!")
                    
                })
                .catch(() => {
                    ErrorNotify("Something went wrong! Try again")
                })
            }
            
            if(tabKey){
                changeTab(tabKey)
            }
            
        }
    }

    const handleGoToRequirement = () => {
        var Data = encodeBase64({ requirementId: workerProgressInfo.RequirementCode  });
        props.history.push("/requirement/" + Data)
    }


    return(
        <Fragment>
            
            {/* <Header session={session} /> */}

            <Tab.Container activeKey={activeTab} onSelect={(k) => changeTab(k)}>
                <Row className="mx-5 m-5">
                    <Col sm={3}>
                        <Card className='shadow-sm mb-3'>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="selection" style={{cursor:"pointer"}}>
                                        Selection
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="pcc" style={{cursor:"pointer"}}>
                                        PCC
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="flight" style={{cursor:"pointer"}}>
                                        Flight
                                    </Nav.Link>
                                </Nav.Item>
                                {
                                    // show to supplier not to buyer/client
                                    session.Role === Role.Supplier ?
                                        <Nav.Item>
                                            <Nav.Link eventKey="doc" style={{ cursor: "pointer" }}>
                                                Document
                                            </Nav.Link>
                                        </Nav.Item>
                                        : null
                                }
                                
                            </Nav>
                        </Card>
                        <OutlinePrimaryButton text={ <span><MdOutlineArrowBack className='mb-1'/>Back to Requirement</span>} onClickEvent={handleGoToRequirement}/>
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
                            {
                                // show to supplier not to buyer/client
                                session.Role === Role.Supplier ?
                                    <Tab.Pane eventKey="doc">
                                        <DocDetails workerData={workerProgressInfo} handleOnChange={updateFromChild} />
                                    </Tab.Pane>
                                    : null
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Fragment>
    )
} 

export default withRouter(WorkerProgress)