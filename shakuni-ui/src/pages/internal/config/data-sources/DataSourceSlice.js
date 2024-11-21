import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addEditDataSourceType : 0,
    selectedDataSourceType : 0,
    selectedDataSourceTypeLabel : '',
    selectedDataSourceTypeAction : '',

    selectedDataSourceImageUrl : '',
    selectedDataSourceProperties : [],
    configuredDataSourceList : [],
}

function sortPropertiesPerOrdinal(props) {
    let entries = Object.entries(props);
    entries.sort(([, a], [, b]) => Number(a.ordinal) - Number(b.ordinal));
    return Object.fromEntries(entries);
}


const dataSourceSlice = createSlice({
    name : 'dataSourceSlice',
    initialState,
    reducers:{
        setStoreSelectedDataSourceType(state,action){
            state.selectedDataSourceType = action.payload;
            localStorage.setItem('setStoreSelectedDataSourceType',state.selectedDataSourceType);
        },

        setStoreSelectedDataSourceImageUrl(state,action){
            state.selectedDataSourceImageUrl = action.payload;
            localStorage.setItem('setStoreSelectedDataSourceImageUrl',state.selectedDataSourceImageUrl);
        },

        setStoreSelectedDataSourceProperties(state,action){
            state.selectedDataSourceProperties = sortPropertiesPerOrdinal(action.payload);
        },

        setStoreConfiguredDataSourceList(state,action){
            state.configuredDataSourceList = action.payload;
        },
        
        setStoreSelectedAddEditDataSourceType(state,action){
            state.addEditDataSourceType = action.payload;
        },

        setStoreSelectedDataSourceTypeLabel(state,action){
            state.selectedDataSourceTypeLabel = action.payload;
        },

        setStoreSelectedDataSourceTypeAction(state,action){
            state.selectedDataSourceTypeAction = action.payload;
        },



    }
});

export const {setStoreSelectedDataSourceType,setStoreSelectedDataSourceTypeAction,setStoreSelectedDataSourceTypeLabel,setStoreSelectedAddEditDataSourceType,setStoreSelectedDataSourceImageUrl,setStoreSelectedDataSourceProperties,setStoreConfiguredDataSourceList} = dataSourceSlice.actions;
export default dataSourceSlice.reducer;
