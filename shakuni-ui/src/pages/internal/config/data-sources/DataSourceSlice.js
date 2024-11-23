import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addEditDataSourceType : 0,
    addEditConfiguredDataSourceId : 0,
    selectedDataSourceType : 0,
    selectedDataSourceTypeLabel : '',
    selectedDataSourceTypeAction : '',
    selectedDataSourceImageUrl : '',
    selectedDataSourceProperties : [],
    configuredDataSourceList : [],
    selectedDataSourceValues:[],
    formLoaded:false,
    propDisabled:false,
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
        },

        setStoreSelectedAddEditConfiguredDataSourceId(state,action){
            state.addEditConfiguredDataSourceId = action.payload;
        },

        setStoreSelectedDataSourceImageUrl(state,action){
            state.selectedDataSourceImageUrl = action.payload;
            localStorage.setItem('setStoreSelectedDataSourceImageUrl',state.selectedDataSourceImageUrl);
        },

        setStoreSelectedDataSourceProperties(state,action){
            state.selectedDataSourceProperties = sortPropertiesPerOrdinal(action.payload);
        },

        setStoreSelectedDataSourceValues(state,action){
            state.selectedDataSourceValues = action.payload;
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

        setStoreFormLoaded(state,action){
            state.formLoaded = action.payload;
        },

        setStorePropDisabled(state,action){
            state.propDisabled = action.payload;
        },



    }
});

export const {setStoreSelectedDataSourceType,setStoreSelectedAddEditConfiguredDataSourceId,setStorePropDisabled,setStoreFormLoaded,setStoreSelectedDataSourceValues,setStoreSelectedDataSourceTypeAction,setStoreSelectedDataSourceTypeLabel,setStoreSelectedAddEditDataSourceType,setStoreSelectedDataSourceImageUrl,setStoreSelectedDataSourceProperties,setStoreConfiguredDataSourceList} = dataSourceSlice.actions;
export default dataSourceSlice.reducer;
