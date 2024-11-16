import axios from 'axios';
import { BASE_URL } from "./Constants";
import { notification } from "antd";

function fetchBaseUrl(){
    return BASE_URL;
}


const instance = axios.create({
    baseURL: fetchBaseUrl()
})

instance.interceptors.response.use(
    response => {
        if(response.status === 302 || response.status === 403 || response.status === 404){
            notification.error({
                message:"Error",
                duration:1,
                description:"Something Went Wrong",
                style: { width: '250px' }
            })
        window.location.href = "/"
        }

    return response
    },error =>{
    //     if(error.response.status === 403){
    //         notification.error({
    //         message:error.response.status,
    //         duration:1,
    //         description:"Login Required",
    //         style: { width: '250px' }
    //     })
    //     const delayFucnt = setTimeout(() => {
    //        window.location.href = "/"
    //     }, 1000);

    // }

    return error

    }
)



export default instance;
