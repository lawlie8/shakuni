import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isModalOpen: false,
    isNewTaskModalOpen:false,
    selectedConfiguredDataSourceId: 0,
    selectedDataSourceId: 0,
    jobUpdateObj:[],
    selectedJobItem:[],
    taskList:[],
    selectedTaskId:0,
}

const JobSlice = createSlice({
    name: 'JobSlice',
    initialState,
    reducers: {
        setIsModalOpen(state, action) {
            state.isModalOpen = action.payload;
        },

        setIsNewTaskModalOpen(state, action) {
          state.isNewTaskModalOpen = action.payload;
      },

        setStoreSelectedConfiguredDataSourceId(state, action) {
            state.selectedConfiguredDataSourceId = action.payload;
        },

        setStoreSelectedDataSourceId(state, action) {
            state.selectedDataSourceId = action.payload;
        },

        setStoreJobUpdateObj(state,action){
            const newJob = action.payload;
            const index = state.jobUpdateObj.findIndex(job => job.jobId === newJob.jobId);
      
            if (index !== -1) {
              state.jobUpdateObj[index] = newJob;
            } else {
              state.jobUpdateObj.push(newJob);
            }
          },
          
          setStoreSlectedJobItem(state,action){
            state.selectedJobItem = action.payload;
          },

          setTasks(state,action){
            state.taskList = action.payload;
          },

          setSelectedTaskId(state,action){
            state.selectedTaskId = action.payload
          }


    }
})

export const { setIsModalOpen,setIsNewTaskModalOpen, setStoreSelectedConfiguredDataSourceId, setStoreSelectedDataSourceId,setStoreJobUpdateObj,setStoreSlectedJobItem ,setTasks,setSelectedTaskId} = JobSlice.actions;
export default JobSlice.reducer;