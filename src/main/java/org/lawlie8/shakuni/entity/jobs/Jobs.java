package org.lawlie8.shakuni.entity.jobs;

import jakarta.persistence.*;
import org.lawlie8.shakuni.web.jobs.util.ExecutionTypeEnum;
import org.lawlie8.shakuni.web.jobs.util.StatusEnum;

import java.util.Date;

@Entity
@Table(name = "jobs")
public class Jobs {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Enumerated(EnumType.STRING)
    private ExecutionTypeEnum executionType;

    @Column(name = "execution_pattern")
    private String executionPattern;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private StatusEnum statusEnum;

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

    public ExecutionTypeEnum getExecutionType() {
        return executionType;
    }

    public void setExecutionType(ExecutionTypeEnum executionType) {
        this.executionType = executionType;
    }

    public String getExecutionPattern() {
        return executionPattern;
    }

    public void setExecutionPattern(String executionPattern) {
        this.executionPattern = executionPattern;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public StatusEnum getStatusEnum() {
        return statusEnum;
    }

    public void setStatusEnum(StatusEnum statusEnum) {
        this.statusEnum = statusEnum;
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
                ", description='" + description + '\'' +
                ", statusEnum=" + statusEnum +
                '}';
    }
}
