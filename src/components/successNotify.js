import {Bounce, toast} from "react-toastify";

const successNotify = (message) => toast.success(message, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
});

export default successNotify;
