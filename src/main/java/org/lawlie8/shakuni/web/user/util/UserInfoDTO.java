package org.lawlie8.shakuni.web.user.util;

import org.lawlie8.shakuni.entity.Permissions;

import java.util.Date;
import java.util.List;

public class UserInfoDTO {

    private Long id;
    private String userName;
    private Date creationDate;
    private Boolean isDefaultUser;
    private List<Permissions> permissionsList;

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

    public List<Permissions> getPermissionsList() {
        return permissionsList;
    }

    public void setPermissionsList(List<Permissions> permissionsList) {
        this.permissionsList = permissionsList;
    }

    public Boolean getDefaultUser() {
        return isDefaultUser;
    }

    public void setDefaultUser(Boolean defaultUser) {
        isDefaultUser = defaultUser;
    }

    @Override
    public String toString() {
        return "UserInfoDTO{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", creationDate=" + creationDate +
                ", isDefaultUser=" + isDefaultUser +
                ", permissionsList=" + permissionsList +
                '}';
    }
}
