package org.lawlie8.shakuni.web.user;

import org.lawlie8.shakuni.entity.User.PermissionList;
import org.lawlie8.shakuni.entity.User.Users;
import org.lawlie8.shakuni.entity.User.Role;

import org.lawlie8.shakuni.repo.PermissionListRepo;
import org.lawlie8.shakuni.repo.PermissionRepo;
import org.lawlie8.shakuni.repo.RoleRepo;
import org.lawlie8.shakuni.repo.UserRepo;
import org.lawlie8.shakuni.web.user.util.SaveUserDTO;
import org.lawlie8.shakuni.web.user.util.UserInfoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PermissionListRepo permissionListRepo;

    @Autowired
    private PermissionRepo permissionRepo;

    public List<UserInfoDTO> fetchAllUsers(){

        List<Users> usersList = userRepo.findAll();
        List<UserInfoDTO> userInfoDTOList = new ArrayList<>();

        try {
            for(Users user : usersList){
                UserInfoDTO userInfoDTO = new UserInfoDTO();
                userInfoDTO.setUserName(user.getUserName());
                userInfoDTO.setId(user.getId());
                userInfoDTO.setDefaultUser(user.getDefaultUser());
                userInfoDTO.setCreationDate(new Date());
                userInfoDTO.setPermissionsList(user.getRole().getPermissionsList());
                userInfoDTOList.add(userInfoDTO);
            }
        }catch (Exception e){
            log.error("Exception Occurred While Fetching All Users",e.getStackTrace());
        }
        return userInfoDTOList;
    }

    public List<Role> fetchAllRoles(){

        List<Role> roleList = new ArrayList<>();
        try {
            log.info("Fetching Configured Role List");
            roleList = roleRepo.findAll();
        }catch (Exception e){
            log.error("Exception Occurred While Fetching Role List");
        }
        return roleList;
    }

    public List<PermissionList> fetchAllPermission(){

        List<PermissionList> roleList = new ArrayList<>();
        try {
            log.info("Fetching Configured Role List");
            roleList = permissionListRepo.findAll();
        }catch (Exception e){
            log.error("Exception Occurred While Fetching Role List");
        }
        return roleList;
    }

    public List<PermissionList> fetchPermissionByRoleList(Long roleId){

        List<PermissionList> roleList = new ArrayList<>();
        try {
            log.info("Fetching Configured Role List");
            roleList = permissionListRepo.getPermissionListByRoleId(roleId);
        }catch (Exception e){
            log.error("Exception Occurred While Fetching Role List");
        }
        return roleList;
    }

    public List<PermissionList> fetchPermissionByRoleName(String roleName){

        List<PermissionList> roleList = new ArrayList<>();
        try {
            log.info("Fetching Configured Role List");
            roleList = permissionListRepo.getPermissionListByRoleName(roleName);
        }catch (Exception e){
            log.error("Exception Occurred While Fetching Role List");
        }
        return roleList;
    }

    public Boolean saveNewUser(SaveUserDTO saveUserDTO){
        log.info(saveUserDTO.toString());
        return true;
    }

}
