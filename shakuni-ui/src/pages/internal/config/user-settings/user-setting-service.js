import instance from "../../../../util/axios";
import { USER_GET_ALL,ROLE_GET_ALL,PERMISSION_GET_ALL,PERMISSION_GET_BY_NAME, SAVE_NEW_USER } from "../../../../util/Constants";

export function getAllUsers(){
    return instance.get(`${USER_GET_ALL}`)
}

export function getAllUserRoleOptions(){
    return instance.get(`${ROLE_GET_ALL}`)
}

export function getAllPermissionOptions(){
    return instance.get(`${PERMISSION_GET_ALL}`)
}


export function getAllPermissionOptionsByRoleName(roleName){
    return instance.get(`${PERMISSION_GET_BY_NAME}/${roleName}`)
}

export function saveUser(formValues){
    return instance.post(SAVE_NEW_USER,{
        name:formValues.name,
        lastName:formValues.lastName,
        email:formValues.email,
        password:formValues.password,
        rePassword:formValues.rePassword,
        role:formValues.role,
        customRole:formValues.customRole,
        permissionList:formValues.permissionList
    });
}