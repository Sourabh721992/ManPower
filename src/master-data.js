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

export {
    LanguagesData, Role
}