import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../../Css/app.css";
import { DashboardApi } from "../../utils/ApiFunctions";
import "react-phone-number-input/style.css";
import UserProfile from "../../utils/UserProfile";
import StatusCounter from "./StatusCounter"
import RequirementTable from "./RequirementTable";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import FilterRequirements from "./Filter";

export default function Dashboard(props) {
    
    const history = useHistory();
    
    const handleShow = () => { history.push("/AddRequirement"); }
    var session = UserProfile.getSession();

    const [StatusCounterData, setStatusCounter] = useState(session.StatusCounter)
    const [Requirements, setRequirements] = useState(session.Requirements)
    const [FilteredRequirements, setFilteredRequirements] = useState(session.Requirements)
    const fromRequirementTab = props.fromRequirementTab ? props.fromRequirementTab : false

    useEffect(() => {
        updateSession()
    }, [])

    const updateSession = () => {
        // call API
        const body = {
            userId : session.UserId
        }

        DashboardApi(body).then
                ((resData) => {
                    let StatusCounterCopy = Object.assign({}, StatusCounterData)
                    let RequirementDataCopy = [...Requirements]
                    let FilteredRequirementsCopy = [...FilteredRequirements]
                    UserProfile.setSession(resData.Message, true);
                    session = UserProfile.getSession()
                    resData.Message = JSON.parse(resData.Message)
                    if(resData.Message.StatusCounter ){
                        StatusCounterCopy = resData.Message.StatusCounter
                    }
                    if(resData.Message.Requirements){
                        RequirementDataCopy = resData.Message.Requirements
                        FilteredRequirementsCopy = resData.Message.Requirements
                    }
                    setFilteredRequirements(FilteredRequirementsCopy)
                    setRequirements(RequirementDataCopy)
                    setStatusCounter(StatusCounterCopy)
                    
                    // SetInitialState();

                }).catch((error) => {
                    // alert("catch error found 1", error);
                })
    }

    const handleFromChild = (action, data) => {
        let FilteredRequirementsCopy = [...FilteredRequirements]
        let RequirementDataCopy = [...Requirements]
        if (data && action === "filterApplied") {
            FilteredRequirementsCopy = data
        }
        else if (action === "clearFilter") {
            FilteredRequirementsCopy = Requirements
        }
        else if(action === "update-requirements"){
            FilteredRequirementsCopy = data
            setRequirements(RequirementDataCopy)
        }
        setFilteredRequirements(FilteredRequirementsCopy)
    }

    return (
        <>
            {/* <Header session={session} /> */}
            {
                fromRequirementTab ?
                    null :
                    <StatusCounter detail={StatusCounterData} />

            }
            <div className='mx-5 my-1'>

                <div className='d-flex align-items-end'>
                    <h5 className='mb-0 text-muted flex-grow-1'>
                        { fromRequirementTab ? "All Requirements" : "Recent Requirements" }</h5>
                    {/* <h6 className='mb-0'><FiFilter className='f-24 mr-2' /> Filter</h6> */}
                    {/* <FilterButton /> */}
                    <FilterRequirements originalData={Requirements} UpdateParent={handleFromChild}/>
                    <div className="fl" style={{marginLeft: "2%", cursor: "pointer" }} onClick={handleShow}>
                        <div className="fl" style={{ width: "25px", marginTop: "8px" }}>
                            <IconContext.Provider value={{ color: "#3860C7", size: "1.4em" }} >
                                <div>
                                    <BsFillPlusCircleFill />
                                </div>
                            </IconContext.Provider>
                        </div>
                        <button className="btn addbtn">
                            Add New Requirement
                        </button>
                    </div>
                </div>

                <hr />
                <RequirementTable detail={FilteredRequirements} UpdateParent={handleFromChild}/>
            </div>
        </>
    )
}