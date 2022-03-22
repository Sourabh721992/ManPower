import React, { Component } from 'react'
import UserProfile from '../../../utils/UserProfile';
// import Header from '../../Layout/Header'
// import Footer from '../../Layout/Footer'
import RequirementTable from '../RequirementTable';
// import { FiFilter } from "react-icons/fi";
import StatusCounter from '../StatusCounter';
// import {FilterButton} from '../../Controls/Buttons/Buttons';
// import { TradesApi } from '../../../utils/ApiFunctions';
import { logger } from '../../../utils/CommonList';
import { DashboardApi } from '../../../utils/ApiFunctions';
import ReactSpinner from '../../Controls/Loader/ReactSpinner';
import FilterRequirements from '../Filter';

export class SupplierDashboard extends Component {

    constructor(props) {
        super(props)
    
        var session = UserProfile.getSession(); 
        this.state = {
            session,
            StatusCounter: session.StatusCounter,
            Requirements: session.Requirements,
            FilteredRequirements: session.Requirements,
            isLoading: true,
            fromRequirementTab: props.fromRequirementTab ? props.fromRequirementTab : false
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
                        stateCopy.FilteredRequirements = resData.Message.Requirements
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

    handleFromChild = (action, data) => {
        let stateCopy = Object.assign({}, this.state);
        if (data && action === "filterApplied") {
            stateCopy.FilteredRequirements = data
        }
        else if (action === "clearFilter") {
            stateCopy.FilteredRequirements = stateCopy.Requirements
        }
        else if(action === "update-requirements"){
            stateCopy.FilteredRequirements = data
            stateCopy.Requirements = data
        }
        this.setState(stateCopy)
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
                {
                    this.state.fromRequirementTab ?
                    null :
                        <StatusCounter detail={this.state.StatusCounter} />
                }
                

                <div className='mx-5 my-1'>
                    
                    <div className='d-flex justify-content-between align-items-end'>
                        <h5 className='mb-0 text-muted'>
                            {
                                this.state.fromRequirementTab ? "All Requirements" : "Recent Requirements"
                            }
                        </h5>
                        {/* <h6 className='mb-0'><FiFilter className='f-24 mr-2' /> Filter</h6> */}
                        {/* <FilterButton /> */}
                        <FilterRequirements originalData={this.state.Requirements} UpdateParent={this.handleFromChild}/>
                    </div>

                    <hr />
                    <RequirementTable detail={this.state.FilteredRequirements} UpdateParent={this.handleFromChild}/>
                </div>

                {/* <Footer /> */}
                
            </>
        )
    }
}

export default SupplierDashboard