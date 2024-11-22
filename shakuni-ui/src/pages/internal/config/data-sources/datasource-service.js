import instance from "../../../../util/axios";
import { DATASOURCE_TYPE_GET,DATASOURCE_CHECK_CONNECTION,DATASOURCE_CONFIGURED_GET_BY_ID,
     DATASOURCE_CONFIGURED_DELETE_BY_ID,DATASOURCE_PROPERTIES_GET_BY_DATASOURCE_TYPE_ID } from "../../../../util/Constants";

export function fetchDataSourceTypes(){
    return instance.get(DATASOURCE_TYPE_GET);
}

export function fetchConfiguredDataSourcesById(id){
    return instance.get(`${DATASOURCE_CONFIGURED_GET_BY_ID}/${id}`);
}

export function fetchConfiguredDataSourcePropertiesByDataSourceTypeId(id){
    return instance.get(`${DATASOURCE_PROPERTIES_GET_BY_DATASOURCE_TYPE_ID}/${id}`);
}

export function deleteConfiguredDataSourceById(id){
    return instance.delete(`${DATASOURCE_CONFIGURED_DELETE_BY_ID}/${id}`)
}

export function checkDataSourceConnection(addEditDataSourceType,values){
    return instance.post(DATASOURCE_CHECK_CONNECTION,{
        dataSourceTypeId: addEditDataSourceType,
        propertyValueMap:values
    });
}