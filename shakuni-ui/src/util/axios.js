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
        console.log("sucess", Math.round(response.status / 100));
        if(response.status === 302 || response.status === 403 || response.status === 404 || response.status === 401){
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
        console.log("error",error.response.status);
        if(error.response.status === 403 || error.response.status === 401){
            notification.error({
            message:error.response.status,
            duration:1,
            description:"Login Required",
            style: { width: '250px' }
        })

        const delayFucnt = setTimeout(() => {
           window.location.href = "/"
        }, 1000);

    }

    return error

    }
)



export default instance;
