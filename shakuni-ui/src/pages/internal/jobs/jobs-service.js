import instance from "../../../util/axios";
import { JOBS_ALL_COUNT, JOBS_EXECUTE_ID, JOBS_GET_PAGABLE, JOBS_CREATE_NEW, JOBS_GET_RECENT, JOBS_DELETE_ID, TASKS_GET_BY_JOB_ID, TASKS_CREATE_NEW } from "../../../util/Constants";

export function fetchAllJobsPagable(page, size) {
   return instance.get(`${JOBS_GET_PAGABLE}/${page}/${size}`);
}

export function fetchAllJobsCount() {
   return instance.get(JOBS_ALL_COUNT);
}

export function fetchRecentJobs() {
   return instance.get(JOBS_GET_RECENT);
}

export function deleteJobById(id) {
   return instance.delete(`${JOBS_DELETE_ID}/${id}`);
}

export function runJobById(id) {
   return instance.get(`${JOBS_EXECUTE_ID}/${id}`);
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

export function createNewTask(values) {
   return instance.post(TASKS_CREATE_NEW,{
      taskName : values.TaskName,
      jobId : values.jobId,
      description : values.description,
      taskType : values.taskType
   })
}

export function fetchTasksByJobId(jobId) {
   return instance.get(`${TASKS_GET_BY_JOB_ID}/${jobId}`);
}
