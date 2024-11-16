import { DatabaseFilled } from "@ant-design/icons";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDataSouceType : 0,
    selectedDataSourceImageUrl : '',
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


    }
});

export const {setStoreSelectedDataSourceType,setStoreSelectedDataSourceImageUrl} = dataSourceSlice.actions;
export default dataSourceSlice.reducer;
