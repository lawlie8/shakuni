import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isModalOpen: false,
    selectedConfiguredDataSourceId: 0,
    selectedDataSourceId: 0,
    jobUpdateObj:[]
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

        setStoreJobUpdateObj(state,action){
            const newJob = action.payload;

            // Find the index of the job with the same jobId
            const index = state.jobUpdateObj.findIndex(job => job.jobId === newJob.jobId);
      
            if (index !== -1) {
              // If found, replace the existing object
              state.jobUpdateObj[index] = newJob;
            } else {
              // If not found, add the new job
              state.jobUpdateObj.push(newJob);
            }
          },

    }
})

export const { setIsModalOpen, setStoreSelectedConfiguredDataSourceId, setStoreSelectedDataSourceId,setStoreJobUpdateObj } = JobSlice.actions;
export default JobSlice.reducer;