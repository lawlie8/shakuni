package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.User.PermissionList;
import org.lawlie8.shakuni.entity.User.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PermissionRepo extends JpaRepository<Permissions,Long> {


}
