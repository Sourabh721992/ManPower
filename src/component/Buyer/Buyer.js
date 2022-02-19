import React, { Component, Fragment } from 'react'
import { Col, Tab, Tabs } from 'react-bootstrap';
import { GetBuyerListApi, GetPendingUsersApi } from '../../utils/ApiFunctions';
// import { logger } from '../../utils/CommonList';
import UserProfile from '../../utils/UserProfile';
// import Header from '../Layout/Header'
import TotalBuyerTab from './TotalBuyerTab';
import PendingBuyerTab from './PendingBuyerTab';
import { logger } from '../../utils/CommonList';
import SuccessAlert from '../Controls/alert/successAlert';
// import { logger } from '../../utils/CommonList';

export default class Buyer extends Component {
    constructor(props) {
        super(props)

        var session = UserProfile.getSession();
        this.state = {
            session,
            activeTab:"totalBuyer",
            totalBuyers: [],
            totalBuyersCount: 0,
            pendingBuyers: [],
            pendingBuyersCount: 0
        }
    }

    componentDidMount(){
        GetBuyerListApi(this.state.session.UserId)
            .then((result) => {
                if(result && result.Message){

                    let buyersResponse = JSON.parse(result.Message)
                    this.setState({ totalBuyers: buyersResponse.Buyers, totalBuyersCount: buyersResponse.Count })
                }
            })

    
        let item = {};
        item.UserId = this.state.session.UserId.toString()

        GetPendingUsersApi(item).then
            ((resData) => {

                let pendingUsers = JSON.parse(resData.Message)
                this.setState({ pendingBuyers: pendingUsers, pendingBuyersCount: pendingUsers.length })
                logger.log(pendingUsers)
            }).catch((error) => {
                // console.log("catch Error found in GetSupplierApi", JSON.stringify(error));
            })
    }

    handleResponse = (res) => {
        let item = {};
        item.UserId = this.state.session.UserId.toString()
        if(res.isSuccess){
            GetPendingUsersApi(item).then
            ((resData) => {

                let pendingUsers = JSON.parse(resData.Message)
                this.setState({ pendingBuyers: pendingUsers, pendingBuyersCount: pendingUsers.length })
                logger.log(pendingUsers)
            }).catch((error) => {
                // console.log("catch Error found in GetSupplierApi", JSON.stringify(error));
            })
        }

    }

    render() {
        return (
            <Fragment>
                {/* <Header session={this.state.session} /> */}
                <h4 className='font-weight-bolder text-muted m-4'>Buyer Information</h4>
                {/* <SuccessAlert show={this.state.showAlert} message={this.state.alertMessage} variant={this.state.showAlert === true ? "success" : "danger"} /> */}
                {/* Tabs for Total Buyer and Pending Buyer */}
                <Tabs activeKey={this.state.activeTab} onSelect={(t) => this.setState({activeTab:t})}>
                    <Tab eventKey="totalBuyer" title="Total Buyers">
                        <TotalBuyerTab count={this.state.totalBuyersCount} list={this.state.totalBuyers}/>
                    </Tab>

                    <Tab eventKey="pendingBuyer" title="Pending Buyers">
                        <PendingBuyerTab count={this.state.pendingBuyersCount} list={this.state.pendingBuyers} response={(res) => this.handleResponse(res)} />
                    </Tab>
                </Tabs>
            </Fragment>
        )
    }
}
