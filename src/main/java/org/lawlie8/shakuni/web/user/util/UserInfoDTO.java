package org.lawlie8.shakuni.web.user.util;

import java.util.Date;
import java.util.List;

public class UserInfoDTO {

    private Long id;
    private String userName;
    private Date creationDate;
    private List<String> permissionsList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public List<String> getPermissionsList() {
        return permissionsList;
    }

    public void setPermissionsList(List<String> permissionsList) {
        this.permissionsList = permissionsList;
    }

    @Override
    public String toString() {
        return "UserInfoDTO{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", creationDate=" + creationDate +
                ", permissionsList=" + permissionsList +
                '}';
    }
}
