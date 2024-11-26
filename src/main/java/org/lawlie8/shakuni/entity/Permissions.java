package org.lawlie8.shakuni.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "permissions")
public class Permissions {

    @Column(name = "id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "permission_name")
    private String permissionName;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

}
