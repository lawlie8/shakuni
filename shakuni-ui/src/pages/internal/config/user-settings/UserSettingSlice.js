import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSettingsInfo:[{userName:'Admin'},],
};

const userSettingSlice = createSlice({
    name:"userSettingSlice",
    initialState,
    reducers:{
        setStoreSelectedUserSetting(state,action){
            state.userSettingsInfo = action.payload;
        }
    }
})

export const {setStoreSelectedUserSetting} = userSettingSlice.actions;
export default userSettingSlice.reducer;