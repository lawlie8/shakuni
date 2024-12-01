package org.lawlie8.shakuni.web.user.util;

import java.util.List;

public class SaveUserDTO {

    private String name;
    private String lastName;
    private String email;
    private String password;
    private String rePassword;
    private String role;
    private Boolean customRole;
    private List<String> permissionList;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRePassword() {
        return rePassword;
    }

    public void setRePassword(String rePassword) {
        this.rePassword = rePassword;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getCustomRole() {
        return customRole;
    }

    public void setCustomRole(Boolean customRole) {
        this.customRole = customRole;
    }

    public List<String> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(List<String> permissionList) {
        this.permissionList = permissionList;
    }

    @Override
    public String toString() {
        return "SaveUserDTO{" +
                "name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", rePassword='" + rePassword + '\'' +
                ", role='" + role + '\'' +
                ", customRole=" + customRole +
                ", permissionList=" + permissionList +
                '}';
    }
}
