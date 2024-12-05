import instance from "../../../../util/axios";
import { USER_GET_ALL,ROLE_GET_ALL,PERMISSION_GET_ALL,PERMISSION_GET_BY_NAME, SAVE_NEW_USER, EDIT_NEW_USER } from "../../../../util/Constants";
import { Buffer } from 'buffer';

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
    let password = Buffer.from(formValues.password).toString('base64');
    let rePassword = Buffer.from(formValues.rePassword).toString('base64');
    return instance.post(SAVE_NEW_USER,{
        name:formValues.name,
        lastName:formValues.lastName,
        email:formValues.email,
        password:password,
        rePassword:rePassword,
        role:formValues.role,
        customRole:formValues.customRole,
        permissionList:formValues.permissionList
    });
}

export function editUser(formValues){
    let password;
    let rePassword;
    if(formValues.password!== undefined && formValues.rePassword !== undefined){
        password = Buffer.from(formValues.password).toString('base64');
        rePassword = Buffer.from(formValues.rePassword).toString('base64');
    }
    return instance.post(EDIT_NEW_USER,{
        name:formValues.name,
        lastName:formValues.lastName,
        email:formValues.email,
        password:password,
        rePassword:rePassword,
        role:formValues.role,
        customRole:formValues.customRole,
        permissionList:formValues.permissionList
    });
}