package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.User.UserProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPropertyRepo extends JpaRepository<UserProperty,Long> {

    @Query(value = "select * from `user_properties` where `user_id` = :userId",nativeQuery = true)
    public List<UserProperty> fetchUserPropertyListByUserId(Long userId);

}
