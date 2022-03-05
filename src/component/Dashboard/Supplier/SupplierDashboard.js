import React, { Component } from 'react'
import UserProfile from '../../../utils/UserProfile';
// import Header from '../../Layout/Header'
// import Footer from '../../Layout/Footer'
import RequirementTable from '../RequirementTable';
// import { FiFilter } from "react-icons/fi";
import StatusCounter from '../StatusCounter';
import {FilterButton} from '../../Controls/Buttons/Buttons';
// import { TradesApi } from '../../../utils/ApiFunctions';
import { logger } from '../../../utils/CommonList';
import { DashboardApi } from '../../../utils/ApiFunctions';
import ReactSpinner from '../../Controls/Loader/ReactSpinner';

export class SupplierDashboard extends Component {

    constructor(props) {
        super(props)
    
        var session = UserProfile.getSession(); 
        this.state = {
            session,
            StatusCounter: session.StatusCounter,
            Requirements: session.Requirements,
            isLoading: true
        }
    }

    componentDidMount(){
        logger.log(this.state.session)
        if(!this.state.session){
            // get data from api
        }

        // call API
        const body = {
            userId : this.state.session.UserId
        }

        let stateCopy = Object.assign({}, this.state);
        DashboardApi(body).then
            ((resData) => {
                if(resData.Message){
                    UserProfile.setSession(resData.Message, true);
                    stateCopy.session = UserProfile.getSession()
                    resData.Message = JSON.parse(resData.Message)
                    if(resData.Message.StatusCounter ){
                        stateCopy.StatusCounter = resData.Message.StatusCounter
                    }
                    if(resData.Message.Requirements){
                        stateCopy.Requirements = resData.Message.Requirements
                    }
                    stateCopy.isLoading = false
                    this.setState(stateCopy)
                }

            }).catch((error) => {
                stateCopy.isLoading = false
                this.setState(stateCopy)
                // alert("catch error found 1", error);
            })
        
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className='my-3 mx-5'>
                    <ReactSpinner loading={this.state.isLoading} />
                </div>
            )
        }                                                                      
        return (
            <>
                {/* <Header session={this.state.session} /> */}

                <StatusCounter detail={this.state.StatusCounter} />

                <div className='mx-5'>
                    
                    <div className='d-flex justify-content-between align-items-end'>
                        <h5 className='mb-0 text-muted'>Recent Requirements</h5>
                        {/* <h6 className='mb-0'><FiFilter className='f-24 mr-2' /> Filter</h6> */}
                        <FilterButton />
                    </div>

                    <hr />
                    <RequirementTable detail={this.state.Requirements}/>
                </div>

                {/* <Footer /> */}
                
            </>
        )
    }
}

export default SupplierDashboard