import instance from "../../../../util/axios";
import { DATASOURCE_TYPE_GET,DATASOURCE_CONFIGURED_GET_BY_ID, DATASOURCE_CONFIGURED_DELETE_BY_ID } from "../../../../util/Constants";

export function fetchDataSourceTypes(){
    return instance.get(DATASOURCE_TYPE_GET);
}

export function fetchConfiguredDataSourcesById(id){
    return instance.get(`${DATASOURCE_CONFIGURED_GET_BY_ID}/${id}`);
}

export function deleteConfiguredDataSourceById(id){
    return instance.delete(`${DATASOURCE_CONFIGURED_DELETE_BY_ID}/${id}`)
}