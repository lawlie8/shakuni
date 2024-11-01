import instance from "../../util/axios";
import { AUTH_URL } from "../../util/Constants";


export function login(values) {
    
    //check for rememberMe undefined.
    if(values.remember_me === undefined){
        values.remember_me = false;
    }

    return instance.post(AUTH_URL, {
        email: values.email,
        password: values.password,
        rememberMe: values.remember_me
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

}
