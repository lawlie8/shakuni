import instance from "../../../../util/axios";
import { USER_GET_ALL,ROLE_GET_ALL,PERMISSION_GET_ALL } from "../../../../util/Constants";

export function getAllUsers(){
    return instance.get(`${USER_GET_ALL}`)
}

export function getAllUserRoleOptions(){
    return instance.get(`${ROLE_GET_ALL}`)
}

export function getAllPermissionOptions(){
    return instance.get(`${PERMISSION_GET_ALL}`)
}