package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.User.UserProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPropertyRepo extends JpaRepository<UserProperty,Long> {

}
