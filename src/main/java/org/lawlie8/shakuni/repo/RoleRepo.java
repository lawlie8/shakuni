package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.User.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role,Long> {

    @Query(value = "select * from `roles` where role_name = :roleName",nativeQuery = true)
    Optional<Role> findByRoleName(String roleName);

}
