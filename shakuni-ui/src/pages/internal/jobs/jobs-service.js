import instance from "../../../util/axios";
import { JOBS_ALL_COUNT, JOBS_GET_PAGABLE, JOBS_CREATE_NEW, JOBS_GET_RECENT } from "../../../util/Constants";

export function fetchAllJobsPagable(page, size) {
   return instance.get(`${JOBS_GET_PAGABLE}/${page}/${size}`);
}

export function fetchAllJobsCount() {
   return instance.get(JOBS_ALL_COUNT);
}

export function fetchRecentJobs() {
   return instance.get(JOBS_GET_RECENT);
}

export function createNewJob(values) {
   return instance.post(JOBS_CREATE_NEW, {
      jobName: values.jobName,
      executionType: values.executionType,
      executionPattern: values.executionPattern,
      selectedConfiguredDataSourceId: values.selectedConfiguredDataSourceId,
      selectedDataSourceId: values.selectedDataSourceId,
      description: values.description,
   })
}