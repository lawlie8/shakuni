import instance from "../../../util/axios";
import { JOBS_ALL_COUNT, JOBS_GET_PAGABLE,JOBS_CREATE_NEW } from "../../../util/Constants";

export function fetchAllJobsPagable(page,size){
   return instance.get(`${JOBS_GET_PAGABLE}/${page}/${size}`);
}

export function fetchAllJobsCount(){
    return instance.get(JOBS_ALL_COUNT);
}

export function createNewJob(values){
   console.log(values);
   
   return instance.post(JOBS_CREATE_NEW,{
      jobName : values.jobName,
      executionType : values.executionType,
      executionPattern : values.executionPattern,
      selectedConfiguredDataSourceId : values.selectedConfiguredDataSourceId,
   })
}