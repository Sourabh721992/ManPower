import toast from "react-hot-toast";
import { DismissThisToast, ErrorNotify, LoadingNotify, SuccessNotify } from "../component/Controls/Toast/Toast";
import Client from "./ApiClient";
import { logger } from "./CommonList";
import UserProfile from "./UserProfile";


const SignupAPI = async (payload) => {
    const loadingToast = LoadingNotify("Signing Up...")

    return new Promise((resolve, reject) => {
        Client.post("User/SignUp", payload) //Signup API Call
            .then((resData) => {

                DismissThisToast(loadingToast)
                SuccessNotify("Signed up successfully!")
                resolve(resData);
            })
            .catch((error) => {
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}



const LoginAPI = (payload, disableToast) => {
    var loadingToast = null
    if(!disableToast){
        loadingToast = LoadingNotify("Logging In...")
    }
    
    return new Promise((resolve, reject) => {
        Client.post("User/LogIn", payload) //Login API Call
            .then((resData) => {
                logger.log("LoginAPI", resData);
                if (loadingToast)
                    DismissThisToast(loadingToast)

                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                if(loadingToast)
                    DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const TradesApi = (payload, disableToast) => {
    let loadingToast = null
    if(!disableToast){
        loadingToast = LoadingNotify("Logging In...")
    }

    return new Promise((resolve, reject) => {
        Client.post("metainfo/trades", payload) //Login API Call
            .then((resData) => {
                logger.log("metainfo/trades", resData);

                if (loadingToast)
                    DismissThisToast(loadingToast)
                // SuccessNotify("Signed up successfully!")
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                if (loadingToast)
                    DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const RequirementInsert = (payload) => {
    const loadingToast = LoadingNotify("Inserting requirement...")

    return new Promise((resolve, reject) => {
        Client.post("Requirement/Insert", payload) //Login API Call
            .then((resData) => {
                logger.log("Requirement/Insert", resData);
                DismissThisToast(loadingToast)
                SuccessNotify("Requirement inserted successfully!")
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const AddSupplierApi = (payload) => {
    const loadingToast = LoadingNotify("Please wait while we are adding supplier...")
    return new Promise((resolve, reject) => {
        Client.post("User/adduser", payload) //Login API Call
            .then((resData) => {
                logger.log("User/adduser", resData);
                DismissThisToast(loadingToast)
                SuccessNotify("Supplier Added Successfully!")

                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)

                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const GetSupplierApi = (payload) => {
    const loadingToast = LoadingNotify("Fetching suppliers list...")

    return new Promise((resolve, reject) => {
        Client.post("Supplier/getSupplierList", payload) //Login API Call
            .then((resData) => {
                logger.log("Supplier/getSupplierList", resData);
                DismissThisToast(loadingToast)
                // SuccessNotify("Signed up successfully!")

                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const GetUserProfileApi = (payload) => {
    // const loadingToast = LoadingNotify("...")

    return new Promise((resolve, reject) => {
        Client.post("User/GetUser", payload) //Login API Call
            .then((resData) => {
                let user = JSON.parse(resData.Message)
                logger.log("User/GetUser", user);
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                
                reject(error);
            });
    })
}

const UpdateUserProfileApi = (payload) => {
    const loadingToast = LoadingNotify("Updating profile...")

    logger.log("Updated User Model", payload);
    return new Promise((resolve, reject) => {
        Client.post("User/UpdateUser", payload) //Login API Call
            .then((resData) => {
                logger.log("User/UpdateUser", resData);
                DismissThisToast(loadingToast)
                SuccessNotify(resData.Message)
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const GetPendingUsersApi = (payload) => {
    const loadingToast = LoadingNotify("Fetching pending users...")

    return new Promise((resolve, reject) => {
        Client.post("User/PendingUsers", payload) //Login API Call
            .then((resData) => {
                logger.log("User/PendingUsers", resData);
                DismissThisToast(loadingToast)

                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const DeletePendingUsersApi = (payload) => {
    const loadingToast = LoadingNotify("Deleting selected user...")
    return new Promise((resolve, reject) => {
        Client.post("User/DeletePendingUsers", payload) //Login API Call
            .then((resData) => {
                logger.log("User/DeletePendingUsers", resData);
                DismissThisToast(loadingToast)
                SuccessNotify(resData.Message)
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const DeleteSupplierApi = (payload) => {
    const loadingToast = LoadingNotify("Deleting selected supplier...")

    return new Promise((resolve, reject) => {
        Client.post("Supplier/RemoveSupplier", payload) //Login API Call
            .then((resData) => {
                logger.log("Supplier/RemoveSupplier", resData);
                DismissThisToast(loadingToast)
                SuccessNotify("Selected supplier deleted.")
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const AddWorkerApi = (payload) => {
    const loadingToast = LoadingNotify("Adding worker...")

    return new Promise((resolve, reject) => {
        Client.post("Worker/Insert", payload) 
            .then((resData) => {
                logger.log("Worker/Insert", resData);
                DismissThisToast(loadingToast)
                SuccessNotify("Worker added successfully!")
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const GetWorkerApi = (payload) => {
    const loadingToast = LoadingNotify("Fetching worker...")

    return new Promise((resolve, reject) => {
        Client.post("GetWorkerApi - Worker/FetchWorker", payload) 
            .then((resData) => {
                logger.log("Worker/FetchWorker", resData);
                DismissThisToast(loadingToast)
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const GetWorkerListApi = (payload) => {
    const loadingToast = LoadingNotify("Fetching workers list...")

    logger.log(payload)
    return new Promise((resolve, reject) => {
        Client.post("Worker/FetchWorkers", payload) 
            .then((resData) => {
                logger.log("GetWorkerListApi - Worker/FetchWorkers", resData);
                DismissThisToast(loadingToast)
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const GetRequirementApi = (payload) => {
    const loadingToast = LoadingNotify("Fetching requirements...")

    return new Promise((resolve, reject) => {
        Client.post("Requirement/Fetch", payload) 
            .then((resData) => {
                logger.log("Requirement/Fetch", resData);
                DismissThisToast(loadingToast)
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const GetBuyerListApi = (supplierId) => {
    const loadingToast = LoadingNotify("Fetching buyer list...")

    let data = {
        supplierId:supplierId
    }
    return new Promise((resolve, reject) => {
        Client.post("Buyer/getBuyerList", data) 
            .then((resData) => {
                logger.log("Buyer/getBuyerList response ->", resData);
                DismissThisToast(loadingToast)
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const AddMapWorkersApi = (payload) => {
    const loadingToast = LoadingNotify("Mapping worker...")

    return new Promise((resolve, reject) => {
        Client.post("Requirement/AddWorkers", payload) 
            .then((resData) => {
                logger.log("Requirement/AddWorkers", resData);
                DismissThisToast(loadingToast)
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const AddBuyerUser = (body) => {
    const loadingToast = LoadingNotify("Adding buyer...")

    return new Promise((resolve, reject) => {
        Client.post("User/AddBuyer", body) //Login API Call
            .then((resData) => {
                logger.log("User/AddBuyer", resData);
                DismissThisToast(loadingToast)
                SuccessNotify("Buyer added!")
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const RemoveWorkerApi = (payload) => {
    const loadingToast = LoadingNotify("Removing worker...")

    return new Promise((resolve, reject) => {
        Client.post("Requirement/RemoveWorker", payload) 
            .then((resData) => {
                logger.log("Requirement/RemoveWorker", resData);
                DismissThisToast(loadingToast)
                SuccessNotify("Worker removed!")
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const RemoveBuyer = (data) => {
    const loadingToast = LoadingNotify("Remover buyer...")

    return new Promise((resolve, reject) => {
        Client.post("Buyer/RemoveBuyer", data) 
            .then((resData) => {
                logger.log("Buyer/RemoveBuyer", resData);
                DismissThisToast(loadingToast)
                SuccessNotify("Buyer removed!")
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                DismissThisToast(loadingToast)
                ErrorNotify(error.Message)
                reject(error);
            });
    })
}

const RequirementUpdateStatusApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("Requirement/UpdateStatus", payload) 
            .then((resData) => {
                logger.log("Requirement/UpdateStatus", resData);
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                reject(error);
            });
    })
}

const WorkerUpdateStatusApi = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("Worker/UpdateStatus", payload) 
            .then((resData) => {
                logger.log("Worker/UpdateStatus", resData);
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                reject(error);
            });
    })
}

const UpdateBuyerSupplierRemarks = (payload) => {
    return new Promise((resolve, reject) => {
        Client.post("Worker/UpdateRemarks", payload) 
            .then((resData) => {
                logger.log("Worker/UpdateRemarks", resData);
                resolve(resData);
            })
            .catch((error) => {
                logger.log(error)
                reject(error);
            });
    })
}

export {
    SignupAPI, LoginAPI, TradesApi, RequirementInsert, AddSupplierApi, GetSupplierApi, GetUserProfileApi, UpdateUserProfileApi, GetPendingUsersApi,
    DeletePendingUsersApi, DeleteSupplierApi, AddWorkerApi, GetWorkerApi, GetWorkerListApi, GetRequirementApi, AddMapWorkersApi,
    GetBuyerListApi, RemoveWorkerApi, AddBuyerUser, RemoveBuyer, RequirementUpdateStatusApi, WorkerUpdateStatusApi, UpdateBuyerSupplierRemarks
}