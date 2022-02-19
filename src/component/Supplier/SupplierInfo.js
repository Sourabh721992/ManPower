import React, { Component, Fragment } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import UserProfile from '../../utils/UserProfile'
import PendingBuyerTab from '../Buyer/PendingBuyerTab'
import TotalBuyerTab from '../Buyer/TotalBuyerTab'
import Header from '../Layout/Header'

export default class SupplierInfo extends Component {
    constructor(props) {
        super(props)

        var session = UserProfile.getSession();
        this.state = {
            session,
            activeTab:"totalSupplier",
            totalSuppliers: [],
            totalBuyersCount: 0,
            pendingSuppliers: [],
            pendingSuppliersCount: 0
        }
    }

  render() {
    return (
        <Fragment>
        <Header session={this.state.session} />
        <h4 className='font-weight-bolder text-muted m-4'>Supplier Information</h4>

        {/* Tabs for Total Buyer and Pending Buyer */}
        <Tabs activeKey={this.state.activeTab} onSelect={(t) => this.setState({activeTab:t})}>
            <Tab eventKey="totalSupplier" title="Total Buyers">
                
            </Tab>

            <Tab eventKey="pendingSupplier" title="Pending Buyers">
                <PendingBuyerTab count={this.state.pendingSuppliersCount} list={this.state.pendingSuppliers} />
            </Tab>
        </Tabs>
    </Fragment>
    )
  }
}
