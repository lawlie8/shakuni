package org.lawlie8.shakuni.web.jobs.util;

public class JobMessage {
    private String status;
    private Float completionPercentage;
    private Long jobId;

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Float getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(Float completionPercentage) {
        this.completionPercentage = completionPercentage;
    }

    @Override
    public String toString() {
        return "JobMessage{" +
                "status='" + status + '\'' +
                ", completionPercentage=" + completionPercentage +
                ", jobId=" + jobId +
                '}';
    }
}
