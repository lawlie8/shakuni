package org.lawlie8.shakuni.entity.jobs;

import jakarta.persistence.*;
import org.lawlie8.shakuni.web.jobs.util.ExecutionTypeEnum;

import java.util.Date;

@Entity
@Table(name = "jobs")
public class Jobs {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "job_name")
    private String jobName;

    @Column(name = "configured_datasource_id")
    private Long configuredDataSourceId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "creation_date")
    private Date creationDate;

    @Column(name = "execution_type")
    private Enum<ExecutionTypeEnum> executionType;

    @Column(name = "execution_pattern")
    private String executionPattern;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public Long getConfiguredDataSourceId() {
        return configuredDataSourceId;
    }

    public void setConfiguredDataSourceId(Long configuredDataSourceId) {
        this.configuredDataSourceId = configuredDataSourceId;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Enum<ExecutionTypeEnum> getExecutionType() {
        return executionType;
    }

    public void setExecutionType(Enum<ExecutionTypeEnum> executionType) {
        this.executionType = executionType;
    }

    public String getExecutionPattern() {
        return executionPattern;
    }

    public void setExecutionPattern(String executionPattern) {
        this.executionPattern = executionPattern;
    }

    @Override
    public String toString() {
        return "Jobs{" +
                "id=" + id +
                ", jobName='" + jobName + '\'' +
                ", configuredDataSourceId=" + configuredDataSourceId +
                ", createdBy='" + createdBy + '\'' +
                ", creationDate=" + creationDate +
                ", executionType=" + executionType +
                ", executionPattern='" + executionPattern + '\'' +
                '}';
    }
}