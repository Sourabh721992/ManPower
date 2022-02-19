import React, { Component } from 'react'
import UserProfile from '../../../utils/UserProfile';
import Header from '../../Layout/Header'
// import Footer from '../../Layout/Footer'
import RequirementTable from '../RequirementTable';
// import { FiFilter } from "react-icons/fi";
import StatusCounter from '../StatusCounter';
import {FilterButton} from '../../Controls/Buttons/Buttons';
// import { TradesApi } from '../../../utils/ApiFunctions';
import { logger } from '../../../utils/CommonList';

export class SupplierDashboard extends Component {

    constructor(props) {
        super(props)
    
        var session = UserProfile.getSession(); 
        this.state = {
            session
        }
    }

    componentDidMount(){
        logger.log(this.state.session)
        if(!this.state.session){
            // get data from api
        }
        
    }

    render() {
        return (
            <>
                <Header session={this.state.session} />

                <StatusCounter detail={this.state.session.StatusCounter} />

                <div className='mx-5'>
                    
                    <div className='d-flex justify-content-between align-items-end'>
                        <h5 className='mb-0'>Recent Requirements</h5>
                        {/* <h6 className='mb-0'><FiFilter className='f-24 mr-2' /> Filter</h6> */}
                        <FilterButton />
                    </div>

                    <hr />
                    <RequirementTable detail={this.state.session.Requirements}/>
                </div>

                {/* <Footer /> */}
                
            </>
        )
    }
}

export default SupplierDashboard