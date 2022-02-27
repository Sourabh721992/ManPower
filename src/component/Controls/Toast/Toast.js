import toast from 'react-hot-toast'

var notifyMsgBody = (title, subTitle) => {
    return (<>
        <label style={{fontWeight:"bold", marginRight:"4px"}}>{title}</label>
        <span>{subTitle}</span>
    </>)
}

const Notify = (text) => toast(text, {
    duration: 4000,
    position: 'top-right',
});

const SuccessNotify = (text) => toast.success(text,{
    duration: 4000,
    position: 'top-right',
})

const ErrorNotify = (text) => toast.error(notifyMsgBody("Error", text),{
    duration: 4000,
    position: 'top-right',
})

const LoadingNotify = (text) => toast.loading(text,{
    position: "top-center"
})

const DismissThisToast = (id) => toast.dismiss(id)

const DismissAllToast = () => toast.dismiss()

export {
    Notify, SuccessNotify, ErrorNotify, LoadingNotify, DismissThisToast, DismissAllToast
}