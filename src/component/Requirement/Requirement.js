import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { GetRequirementApi } from '../../utils/ApiFunctions'
import { decodeBase64, logger } from '../../utils/CommonList'
import ReactSpinner from '../Controls/Loader/ReactSpinner'
import AssignedWorkerTable from './AssignedWorkerTable'
import DetailedCard from './DetailedCard'

const Requirement = (props) => {

    let data, Id
    if (props.match && props.match.params && props.match.params.data) {
        data = JSON.parse(decodeBase64(props.match.params.data))
        if (data && data.requirementId) {
            Id = data.requirementId
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
                    setRequirementData(JSON.parse(response.Message))
                    logger.log(JSON.parse(response.Message))
                }
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })
        }
    
    }, [Id])

    const handleSuccess = (action, data) => {
        
    }

    if(requirementData){
        return (
            <div className='my-3 mx-5'>
                <ReactSpinner loading={isLoading} />
                {/* requirement details */}
                <DetailedCard details={requirementData}/>
    
                {/* assigned worker table */}
                <AssignedWorkerTable workerList={requirementData.Workers} updateParent={handleSuccess}/>
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