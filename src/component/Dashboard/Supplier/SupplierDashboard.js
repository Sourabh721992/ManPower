import React, { Component } from 'react'
import UserProfile from '../../../utils/UserProfile';
import Header from '../../Layout/Header'
import RequirementTable from '../RequirementTable';
import SupplierRequirementTable from './SupplierRequirementTable';
import SupplierStatusCounter from './SupplierStatusCounter';
import { FiFilter } from "react-icons/fi";
import StatusCounter from '../StatusCounter';

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
                {/* <SupplierStatusCounter /> */}

                <div className='mx-5'>
                    
                    <div className='d-flex justify-content-between'>
                        <h6>Recent Requirements</h6>
                        <h6><FiFilter className='f-24 mr-2' /> Filter</h6>
                    </div>

                    <hr />

                    {/* <SupplierRequirementTable /> */}
                    <RequirementTable detail={this.state.session.Requirements}/>
                </div>
                
            </>
        )
    }
}

export default SupplierDashboard