import React, { Fragment } from 'react'
import { Role } from '../../master-data';
import UserProfile from '../../utils/UserProfile';
import Dashboard from '../Dashboard/dashboard';
import SupplierDashboard from '../Dashboard/Supplier/SupplierDashboard';

const RequirementTab = (props) => {

    var session = UserProfile.getSession();
    
    if(session && session.Role === Role.Supplier){
        return (
            <Fragment>
                <SupplierDashboard fromRequirementTab={true}/>
            </Fragment>
        )
    }
    
    if(session && session.Role === Role.Buyer){
        return (
            <Fragment>
                <Dashboard fromRequirementTab={true}/>
            </Fragment>
        )
    }
    
    return null
}

export default RequirementTab