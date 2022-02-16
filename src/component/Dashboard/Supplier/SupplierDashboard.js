import React, { Component } from 'react'
import UserProfile from '../../../utils/UserProfile';
import Header from '../../Layout/Header'
import RequirementTable from '../RequirementTable';
import { FiFilter } from "react-icons/fi";
import StatusCounter from '../StatusCounter';
import FilterButton from '../../Controls/Buttons/Buttons';

export class SupplierDashboard extends Component {

    constructor(props) {
        super(props)
    
        var session = UserProfile.getSession();
        this.state = {
            session
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
                
            </>
        )
    }
}

export default SupplierDashboard