package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.User.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role,Long> {



}
