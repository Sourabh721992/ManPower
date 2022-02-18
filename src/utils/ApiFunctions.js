import Client from "./ApiClient";

const SignupAPI = async (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("User/SignUp", payload) //Signup API Call
            .then((resData) => {

                resolve(resData);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

const LoginAPI = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("User/LogIn", payload) //Login API Call
            .then((resData) => {
                console.log("LoginAPI", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const TradesApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("metainfo/trades", payload) //Login API Call
            .then((resData) => {
                console.log("metainfo/trades", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const RequirementInsert = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("Requirement/Insert", payload) //Login API Call
            .then((resData) => {
                console.log("Requirement/Insert", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const AddSupplierApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("User/adduser", payload) //Login API Call
            .then((resData) => {
                console.log("User/adduser", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const GetSupplierApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("Supplier/getSupplierList", payload) //Login API Call
            .then((resData) => {
                console.log("Supplier/getSupplierList", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const GetUserProfileApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("User/GetUser", payload) //Login API Call
            .then((resData) => {
                console.log("User/GetUser", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const UpdateUserProfileApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("User/UpdateUser", payload) //Login API Call
            .then((resData) => {
                console.log("User/UpdateUser", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const GetPendingUsersApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("User/PendingUsers", payload) //Login API Call
            .then((resData) => {
                console.log("User/PendingUsers", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const DeletePendingUsersApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("User/DeletePendingUsers", payload) //Login API Call
            .then((resData) => {
                console.log("User/DeletePendingUsers", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const DeleteSupplierApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("Supplier/RemoveSupplier", payload) //Login API Call
            .then((resData) => {
                console.log("Supplier/RemoveSupplier", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const AddWorkerApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("Worker/Insert", payload) 
            .then((resData) => {
                console.log("Worker/Insert", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const GetWorkerApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("Worker/FetchWorker", payload) 
            .then((resData) => {
                console.log("Worker/FetchWorker", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const GetWorkerListApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("Worker/FetchWorkers", payload) 
            .then((resData) => {
                console.log("Worker/FetchWorkers", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

const GetBuyerListApi = (supplierId) => {
    return new Promise((resolve, reject) => {
        Client.post("Buyer/getBuyerList", supplierId) 
            .then((resData) => {
                console.log("Buyer/getBuyerList response ->", resData);
                resolve(resData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

export {
    SignupAPI,
    LoginAPI,
    TradesApi,
    RequirementInsert,
    AddSupplierApi,
    GetSupplierApi,
    GetUserProfileApi,
    UpdateUserProfileApi,
    GetPendingUsersApi,
    DeletePendingUsersApi,
    DeleteSupplierApi,
    AddWorkerApi,
    GetWorkerApi,
    GetWorkerListApi,
    GetBuyerListApi
}