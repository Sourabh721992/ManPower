import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { GetRequirementApi } from '../../utils/ApiFunctions'
import { decodeBase64, logger, getItemFromLocalStorage } from '../../utils/CommonList'
import ReactSpinner from '../Controls/Loader/ReactSpinner'
import AssignedWorkerTable from './AssignedWorkerTable'
import DetailedCard from './DetailedCard'

const Requirement = (props) => {

    let data, Id
    // BuyerName = '', Supplier = ''
    if (props.match && props.match.params && props.match.params.data) {
        data = JSON.parse(decodeBase64(props.match.params.data))
        if (data && data.requirementId) {
            if(data.requirementId){
                Id = data.requirementId
            }
            // if(data.buyerName){
            //     BuyerName = data.buyerName
            // }
            // if(data.supplierName){
            //     Supplier = data.supplierName
            // }
        }
        
    }

    const [requirementCode, setRequirement] = useState(Id)
    const [requirementData, setRequirementData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(Id){
            setRequirement(Id)
            setIsLoading(true)
            GetRequirementApi({requirementCode: Id}).then((response) => {
                if (response.Code === 1 && response.Message) {
                    let data = JSON.parse(response.Message)

                    var rData = getItemFromLocalStorage(Id)
                    let BuyerName, Supplier
                    if(rData !== null){
                        BuyerName = rData.buyerName ? rData.buyerName : ""
                        Supplier = rData.supplierName ? rData.supplierName : ""
                    }

                    setRequirementData({...data, BuyerName, Supplier})
                    logger.log(JSON.parse(response.Message))
                }
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })
        }
    
    }, [Id])

    const handleFromChild = (action, data) => {
        if(data){
            let requirementDataCopy = Object.assign({}, requirementData);
            if(action === "update-requirement-details"){
                requirementDataCopy = data
            }
            
            setRequirementData(requirementDataCopy)
        }
    }

    if(requirementData){
        return (
            <div className='my-3 mx-5'>
                <ReactSpinner loading={isLoading} />
                {/* requirement details */}
                <DetailedCard details={requirementData} updateParent={handleFromChild}/>
    
                {/* assigned worker table */}
                <AssignedWorkerTable details={requirementData} updateParent={handleFromChild}/>
            </div>
        )
    
    }
    else if(isLoading) {
        <div className='my-3 mx-5'>
            <ReactSpinner loading={isLoading} />
        </div>
    }
    
    return null

}

export default withRouter(Requirement)