package org.lawlie8.shakuni.entity.jobs;

import jakarta.persistence.*;
import org.lawlie8.shakuni.web.jobs.util.TaskTypeEnum;

import java.sql.Blob;
import java.util.Date;

@Entity
@Table(name = "tasks")
public class Tasks {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "job_id")
    private Long jobId;

    @Column(name = "task_name")
    private String taskName;

    @Column(name = "task_type")
    @Enumerated(EnumType.STRING)
    private TaskTypeEnum taskTypeEnum;

    @Column(name = "task_data")
    private Blob taskData;

    @Column(name = "creation_date")
    private Date taskCreationDate;

    @Column(name = "created_by")
    private String createdBy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public TaskTypeEnum getTaskTypeEnum() {
        return taskTypeEnum;
    }

    public void setTaskTypeEnum(TaskTypeEnum taskTypeEnum) {
        this.taskTypeEnum = taskTypeEnum;
    }

    public Blob getTaskData() {
        return taskData;
    }

    public void setTaskData(Blob taskData) {
        this.taskData = taskData;
    }

    public Date getTaskCreationDate() {
        return taskCreationDate;
    }

    public void setTaskCreationDate(Date taskCreationDate) {
        this.taskCreationDate = taskCreationDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    @Override
    public String toString() {
        return "Tasks{" +
                "id=" + id +
                ", jobId=" + jobId +
                ", taskName='" + taskName + '\'' +
                ", taskTypeEnum=" + taskTypeEnum +
                ", taskData=" + taskData +
                ", taskCreationDate=" + taskCreationDate +
                ", createdBy='" + createdBy + '\'' +
                '}';
    }
}
