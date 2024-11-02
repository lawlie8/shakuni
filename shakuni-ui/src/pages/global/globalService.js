import instance from "../../util/axios";
import { LOGOUT_URL } from "../../util/Constants";

export function logout(){
    return instance.get(LOGOUT_URL);
}