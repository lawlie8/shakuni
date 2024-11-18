import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDataSouceType : 0,
    selectedDataSourceImageUrl : '',
    selectedDataSourceProperties:[],
}

const dataSourceSlice = createSlice({
    name : 'dataSourceSlice',
    initialState,
    reducers:{
        setStoreSelectedDataSourceType(state,action){
            state.selectedDataSouceType = action.payload;
            localStorage.setItem('setStoreSelectedDataSourceType',state.selectedDataSouceType);
        },

        setStoreSelectedDataSourceImageUrl(state,action){
            state.selectedDataSourceImageUrl = action.payload;
            localStorage.setItem('setStoreSelectedDataSourceImageUrl',state.selectedDataSourceImageUrl);
        },

        setStoreselectedDataSourceProperties(state,action){
            state.selectedDataSourceProperties = action.payload;
        },

    }
});

export const {setStoreSelectedDataSourceType,setStoreSelectedDataSourceImageUrl,setStoreselectedDataSourceProperties} = dataSourceSlice.actions;
export default dataSourceSlice.reducer;
