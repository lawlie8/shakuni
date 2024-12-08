package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.User.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {

    @Query(value = "select * from `users` where `user_name` = :userName",nativeQuery = true)
    Optional<Users> findByUserNameNative(String userName);

    @Query(value = "select count(user_name) from users where user_name = :userName",nativeQuery = true)
    Integer checkIfUserAlreadyExists(String userName);

    @Modifying
    @Query(value = "insert into `users` (`user_name`,`password_hash`,`is_default_user`,`role_id`) values (:userName,:passwordHash,:isDefaultUser,:roleId)",nativeQuery = true)
    void saveNewUserNative(String userName,String passwordHash,Boolean isDefaultUser,Long roleId);

    @Modifying
    @Query(value = "update `users` set `role_id`=:roleId,`password_hash`=:passwordHash where `user_name`=:userName",nativeQuery = true)
    void editUserNative(String userName,String passwordHash,Long roleId);


}
