import instance from "../../../../util/axios";
import { DATASOURCE_TYPE_GET } from "../../../../util/Constants";

export function fetchDataSourceTypes(){
    return instance.get(DATASOURCE_TYPE_GET);
}