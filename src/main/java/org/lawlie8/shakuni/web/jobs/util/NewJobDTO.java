package org.lawlie8.shakuni.web.jobs.util;

public class NewJobDTO {

    private String jobName;
    private String executionType;
    private String executionPattern;
    private Long selectedConfiguredDataSourceId;
    private String description;

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getExecutionType() {
        return executionType;
    }

    public void setExecutionType(String executionType) {
        this.executionType = executionType;
    }

    public String getExecutionPattern() {
        return executionPattern;
    }

    public void setExecutionPattern(String executionPattern) {
        this.executionPattern = executionPattern;
    }

    public Long getSelectedConfiguredDataSourceId() {
        return selectedConfiguredDataSourceId;
    }

    public void setSelectedConfiguredDataSourceId(Long selectedConfiguredDataSourceId) {
        this.selectedConfiguredDataSourceId = selectedConfiguredDataSourceId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "NewJobDTO{" +
                "jobName='" + jobName + '\'' +
                ", executionType='" + executionType + '\'' +
                ", executionPattern='" + executionPattern + '\'' +
                ", selectedConfiguredDataSourceId=" + selectedConfiguredDataSourceId +
                ", description='" + description + '\'' +
                '}';
    }
}
