import instance from "../../../../util/axios";
import { USER_GET_ALL } from "../../../../util/Constants";

export function getAllUsers(){
    return instance.get(`${USER_GET_ALL}`)
}