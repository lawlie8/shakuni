import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isModalOpen : false,
}

const JobSlice = createSlice({
    name:'JobSlice',
    initialState,
    reducers:{
        setIsModalOpen(state,action){
            state.isModalOpen = action.payload;
        },

    }
})

export const {setIsModalOpen} = JobSlice.actions;
export default JobSlice.reducer;