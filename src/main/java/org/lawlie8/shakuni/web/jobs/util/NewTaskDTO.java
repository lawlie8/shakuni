package org.lawlie8.shakuni.web.jobs.util;

public class
NewTaskDTO {

    private String taskName;
    private Long jobId;
    private String taskType;
    private String description;

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getTaskType() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "NewTaskDTO{" +
                "taskName='" + taskName + '\'' +
                ", jobId=" + jobId +
                ", taskType='" + taskType + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
