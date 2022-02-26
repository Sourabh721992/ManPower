const LanguagesData = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Marathi", label: "Marathi" },
]

const Role = {
    get Supplier(){
        return "S"
    },

    get Buyer(){
        return "B"
    }
}

const RequirementStatus = {

    get PENDING(){
        return "Pending"
    },

    get PROCESSING(){
        return "Processing"
    }
}

const WorkerStatusDropdownList = [
    { value: "Resources", label: "Resources" },
    { value: "Work Permit", label: "Work Permit" },
    { value: "VISA Stamp", label: "VISA Stamp" },
    { value: "Flight", label: "Flight" },
    { value: "Closed", label: "Closed" },
]

export {
    LanguagesData, Role, RequirementStatus, WorkerStatusDropdownList
}