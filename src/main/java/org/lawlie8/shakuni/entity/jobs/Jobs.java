package org.lawlie8.shakuni.entity.jobs;

import jakarta.persistence.*;

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

    @Override
    public String toString() {
        return "Jobs{" +
                "id=" + id +
                ", jobName='" + jobName + '\'' +
                ", configuredDataSourceId=" + configuredDataSourceId +
                ", createdBy='" + createdBy + '\'' +
                ", creationDate=" + creationDate +
                '}';
    }
}
