import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSettingsInfo:[{userName:'Admin'},],
    allRoles:[],
    allPermissionOptions:[],
    allUsers:[],
};

const userSettingSlice = createSlice({
    name:"userSettingSlice",
    initialState,
    reducers:{
        setStoreSelectedUserSetting(state,action){
            state.userSettingsInfo = action.payload;
        },

        setStoreAllRoles(state,action){
            state.allRoles = action.payload;
        },

        setStorePermissionOptions(state,action){
            state.allPermissionOptions = action.payload;
        },
        
        setAllUsers(state,action){
            state.allUsers = action.payload;
        }
    }
})

export const {setStoreSelectedUserSetting,setStoreAllRoles,setStorePermissionOptions,setAllUsers} = userSettingSlice.actions;
export default userSettingSlice.reducer;