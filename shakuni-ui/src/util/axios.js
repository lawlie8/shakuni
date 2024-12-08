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
    function(response) {
        if(Math.round(response.status / 100) === 4){
            notification.error({
                message:"Error",
                duration:1,
                description:"Something Went Wrong",
                style: { width: '250px' }
            })
        window.location.href = "/"
        }

    return response;
    },function(error){
        if(Math.round(response.status / 100) === 4){
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
