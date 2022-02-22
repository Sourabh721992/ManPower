import toast from 'react-hot-toast'

const Notify = (text) => toast(text, {
    duration: 4000,
    position: 'top-right',
});

const SuccessNotify = (text) => toast.success(text,{
    duration: 4000,
    position: 'top-right',
})

const ErrorNotify = (text) => toast.error(text,{
    duration: 4000,
    position: 'top-right',
})

export {
    Notify, SuccessNotify, ErrorNotify
}