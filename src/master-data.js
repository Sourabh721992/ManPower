const LanguagesData = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Marathi", label: "Marathi" },
    { value: "Assamese", label: "Assamese" },
    { value: "Bengali", label: "Bengali" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Kannada", label: "Kannada" },
    { value: "Kashmiri", label: "Kashmiri" },
    { value: "Konkani", label: "Konkani" },
    { value: "Malayalam", label: "Malayalam" },
    { value: "Manipuri", label: "Manipuri" },
    { value: "Nepali", label: "Nepali" },
    { value: "Oriya", label: "Oriya" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Sanskrit", label: "Sanskrit" },
    { value: "Sindhi", label: "Sindhi" },
    { value: "Tamil", label: "Tamil" },
    { value: "Telugu", label: "Telugu" },
    { value: "Urdu", label: "Urdu" },
    { value: "Bodo", label: "Bodo" },
    { value: "Santhali", label: "Santhali" },
    { value: "Maithili", label: "Maithili" },
    { value: "Dogri", label: "Dogri" },
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