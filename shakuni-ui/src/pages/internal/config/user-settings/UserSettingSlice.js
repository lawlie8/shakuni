import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSettingsInfo:[{userName:'Admin'},],
    allRoles:[],
    allPermissionOptions:[],
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
        }
    }
})

export const {setStoreSelectedUserSetting,setStoreAllRoles,setStorePermissionOptions} = userSettingSlice.actions;
export default userSettingSlice.reducer;