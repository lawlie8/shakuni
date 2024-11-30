package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.User.PermissionList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionListRepo extends JpaRepository<PermissionList,Long> {
}
