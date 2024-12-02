package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.User.PermissionList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PermissionListRepo extends JpaRepository<PermissionList,Long> {

    @Query(value = "select * from `permission_list` pl where `id` in (select `permission_id` from `permissions` p where `role_id` = :roleId)",nativeQuery = true)
    public List<PermissionList> getPermissionListByRoleId(Long roleId);

    @Query(value = "select * from `permission_list` pl where `id` in (select `permission_id` from `permissions` p where `role_id` = (select r.id from `roles` r where `role_name` = :roleName))",nativeQuery = true)
    public List<PermissionList> getPermissionListByRoleName(String roleName);

    @Query(value = "select * from `permission_list` pl where `permission_name` in (:permissionNames)",nativeQuery = true)
    public List<PermissionList> getPermissionListByPermissionNames(List<String> permissionNames);
}
