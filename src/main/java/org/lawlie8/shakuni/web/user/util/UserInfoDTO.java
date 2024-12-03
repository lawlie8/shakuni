package org.lawlie8.shakuni.web.user.util;

import org.lawlie8.shakuni.entity.User.PermissionList;
import org.lawlie8.shakuni.entity.User.Permissions;
import org.lawlie8.shakuni.entity.User.Role;
import org.lawlie8.shakuni.entity.User.UserProperty;

import java.util.Date;
import java.util.List;

public class UserInfoDTO {

    private Long id;
    private String userName;
    private Date creationDate;
    private Boolean isDefaultUser;
    private Role role;
    private List<PermissionList> permissionListList;
    private List<UserProperty> userPropertyList;

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

    public Role getRoles() {
        return role;
    }

    public void setRoles(Role role) {
        this.role = role;
    }

    public Boolean getDefaultUser() {
        return isDefaultUser;
    }

    public void setDefaultUser(Boolean defaultUser) {
        isDefaultUser = defaultUser;
    }

    public List<UserProperty> getUserPropertyList() {
        return userPropertyList;
    }

    public void setUserPropertyList(List<UserProperty> userPropertyList) {
        this.userPropertyList = userPropertyList;
    }

    public List<PermissionList> getPermissionListList() {
        return permissionListList;
    }

    public void setPermissionListList(List<PermissionList> permissionListList) {
        this.permissionListList = permissionListList;
    }

    @Override
    public String toString() {
        return "UserInfoDTO{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", creationDate=" + creationDate +
                ", isDefaultUser=" + isDefaultUser +
                ", role=" + role +
                ", permissionListList=" + permissionListList +
                ", userPropertyList=" + userPropertyList +
                '}';
    }
}
