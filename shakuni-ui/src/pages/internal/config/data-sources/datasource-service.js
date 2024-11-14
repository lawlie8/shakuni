import instance from "../../../../util/axios";
import { DATASOURCE_TYPE_GET,DATASOURCE_CONFIGURED_GET_BY_ID } from "../../../../util/Constants";

export function fetchDataSourceTypes(){
    return instance.get(DATASOURCE_TYPE_GET);
}

export function fetchConfiguredDataSourcesbyId(id){
    return instance.get(`${DATASOURCE_CONFIGURED_GET_BY_ID}/${id}`);
}