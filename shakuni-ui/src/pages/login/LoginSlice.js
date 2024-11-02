import { createSlice } from "@reduxjs/toolkit";

const initialState = {userName : ""};

const loginSlice = createSlice({
    name : "loginSlice",
    initialState,
    reducers:{
        setUserCurrentUser(state,action){
            state.userName = action.payload;
        }
    }
});

export const {setUserCurrentUser} = loginSlice.actions;
export default loginSlice.reducer;