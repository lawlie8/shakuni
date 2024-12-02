package org.lawlie8.shakuni.web.user;

import org.lawlie8.shakuni.entity.User.*;

import org.lawlie8.shakuni.repo.PermissionListRepo;
import org.lawlie8.shakuni.repo.PermissionRepo;
import org.lawlie8.shakuni.repo.RoleRepo;
import org.lawlie8.shakuni.repo.UserRepo;
import org.lawlie8.shakuni.web.user.util.SaveUserDTO;
import org.lawlie8.shakuni.web.user.util.UserInfoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Users users = new Users();
        users.setUserName(saveUserDTO.getEmail());
        users.setDefaultUser(false);
        Role role;
        if(saveUserDTO.getCustomRole() == true){
            role = roleRepo.findByRoleName(saveUserDTO.getRole()).orElseGet(() -> {
                        Role newRole = new Role();
                        newRole.setCreationDate(new Date());
                        newRole.setCreatedBy(auth.getName());
                        newRole.setRoleName(saveUserDTO.getRole());
                        newRole = roleRepo.save(newRole); // Save new role
                        newRole.setPermissionsList(setPermissionList(saveUserDTO.getPermissionList(), newRole));
                        return newRole;
            });
        }else{
            role = roleRepo.findByRoleName(saveUserDTO.getRole())
                    .orElseThrow(() -> new IllegalArgumentException("Role not found: " + saveUserDTO.getRole()));
        }
        users.setUserPropertyList(setUserProperty(saveUserDTO));
        users.setRole(role);
        userRepo.save(users);
        return true;
    }

    private List<Permissions> setPermissionList(List<String> permissions,Role role){
        List<Permissions> permissionsList = new ArrayList<>();
        List<PermissionList> permissionListList = permissionListRepo.getPermissionListByPermissionNames(permissions);
        for(PermissionList pl : permissionListList){
            Permissions permissions1 = new Permissions();
            permissions1.setRoleId(role.getId());
            permissions1.setPermissionId(pl.getId());
            permissionsList.add(permissions1);
        }

        return permissionsList;
    }

    private List<UserProperty> setUserProperty(SaveUserDTO saveUserDTO){
        List<UserProperty> userPropertyList = new ArrayList<>();
        userPropertyList.add(addPropertyName(saveUserDTO.getName()));
        userPropertyList.add(addLastName(saveUserDTO.getLastName()));
        return userPropertyList;
    }

    private UserProperty addPropertyName(String name){
        UserProperty userProperty =  new UserProperty();
        userProperty.setPropertyKey("name");
        userProperty.setPropertyValue(name);
        return userProperty;
    }

    private UserProperty addLastName(String lastName){
        UserProperty userProperty =  new UserProperty();
        userProperty.setPropertyKey("lastName");
        userProperty.setPropertyValue(lastName);
        return userProperty;
    }

}
