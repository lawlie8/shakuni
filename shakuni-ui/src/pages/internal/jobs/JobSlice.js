import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isModalOpen: false,
    selectedConfiguredDataSourceId: 0,
    selectedDataSourceId: 0.
}

const JobSlice = createSlice({
    name: 'JobSlice',
    initialState,
    reducers: {
        setIsModalOpen(state, action) {
            state.isModalOpen = action.payload;
        },

        setStoreSelectedConfiguredDataSourceId(state, action) {
            state.selectedConfiguredDataSourceId = action.payload;
        },

        setStoreSelectedDataSourceId(state, action) {
            state.selectedDataSourceId = action.payload;
        },


    }
})

export const { setIsModalOpen, setStoreSelectedConfiguredDataSourceId, setStoreSelectedDataSourceId } = JobSlice.actions;
export default JobSlice.reducer;