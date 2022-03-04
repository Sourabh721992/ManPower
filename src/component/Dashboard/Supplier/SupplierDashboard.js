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
import { LoginAPI } from '../../../utils/ApiFunctions';

export class SupplierDashboard extends Component {

    constructor(props) {
        super(props)
    
        var session = UserProfile.getSession(); 
        this.state = {
            session,
            StatusCounter: session.StatusCounter,
            Requirements: session.Requirements
        }
    }

    componentDidMount(){
        logger.log(this.state.session)
        if(!this.state.session){
            // get data from api
        }

        // call API
        let item = JSON.parse(localStorage.getItem("LoginCredential"));

        LoginAPI(item, true).then
            ((resData) => {
                if(resData.Message){
                    let stateCopy = Object.assign({}, this.state);
                    resData.Message = JSON.parse(resData.Message)
                    if(resData.Message.StatusCounter ){
                        stateCopy.StatusCounter = resData.Message.StatusCounter
                    }
                    if(resData.Message.Requirements){
                        stateCopy.Requirements = resData.Message.Requirements
                    }
                    this.setState(stateCopy)
                }

            }).catch((error) => {
                // alert("catch error found 1", error);
            })
        
    }

    render() {
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