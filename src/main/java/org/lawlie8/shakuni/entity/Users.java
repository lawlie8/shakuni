package org.lawlie8.shakuni.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "password_hash")
    private String passwordHash;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,orphanRemoval = true)
    @JoinColumn(name = "user_id")
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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public List<Permissions> getPermissionsList() {
        return permissionsList;
    }

    public void setPermissionsList(List<Permissions> permissionsList) {
        this.permissionsList = permissionsList;
    }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", permissionsList=" + permissionsList +
                '}';
    }
}
