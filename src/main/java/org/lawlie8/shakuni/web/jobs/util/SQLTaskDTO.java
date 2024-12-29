package org.lawlie8.shakuni.web.jobs.util;

public class SQLTaskDTO {
    private Long taskId;
    private String sqlCode;
    private String user;

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getSqlCode() {
        return sqlCode;
    }

    public void setSqlCode(String sqlCode) {
        this.sqlCode = sqlCode;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "SQLTaskDTO{" +
                "taskId=" + taskId +
                ", sqlCode='" + sqlCode + '\'' +
                ", user='" + user + '\'' +
                '}';
    }
}
