import instance from "../../../util/axios";
import { JOBS_ALL_COUNT, JOBS_GET_PAGABLE } from "../../../util/Constants";

export function fetchAllJobsPagable(page,size){
   return instance.get(`${JOBS_GET_PAGABLE}/${page}/${size}`);
}

export function fetchAllJobsCount(){
    return instance.get(JOBS_ALL_COUNT);
 }