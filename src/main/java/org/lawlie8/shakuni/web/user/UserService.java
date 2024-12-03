package org.lawlie8.shakuni.web.user;

import jakarta.transaction.Transactional;
import org.lawlie8.shakuni.entity.User.*;

import org.lawlie8.shakuni.repo.*;
import org.lawlie8.shakuni.web.user.util.SaveUserDTO;
import org.lawlie8.shakuni.web.user.util.UserInfoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
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

    @Autowired
    private UserPropertyRepo userPropertyRepo;

    public List<UserInfoDTO> fetchAllUsers() {

        List<Users> usersList = userRepo.findAll();
        List<UserInfoDTO> userInfoDTOList = new ArrayList<>();

        try {
            for (Users user : usersList) {
                UserInfoDTO userInfoDTO = new UserInfoDTO();
                userInfoDTO.setUserName(user.getUserName());
                userInfoDTO.setId(user.getId());
                userInfoDTO.setDefaultUser(user.getDefaultUser());
                userInfoDTO.setCreationDate(new Date());
                userInfoDTO.setPermissionsList(user.getRole().getPermissionsList());
                userInfoDTOList.add(userInfoDTO);
            }
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching All Users", e.getStackTrace());
        }
        return userInfoDTOList;
    }

    public List<Role> fetchAllRoles() {

        List<Role> roleList = new ArrayList<>();
        try {
            log.info("Fetching Configured Role List");
            roleList = roleRepo.findAll();
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching Role List");
        }
        return roleList;
    }

    public List<PermissionList> fetchAllPermission() {

        List<PermissionList> roleList = new ArrayList<>();
        try {
            log.info("Fetching Configured Role List");
            roleList = permissionListRepo.findAll();
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching Role List");
        }
        return roleList;
    }

    public List<PermissionList> fetchPermissionByRoleList(Long roleId) {

        List<PermissionList> roleList = new ArrayList<>();
        try {
            log.info("Fetching Configured Role List");
            roleList = permissionListRepo.getPermissionListByRoleId(roleId);
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching Role List");
        }
        return roleList;
    }

    public List<PermissionList> fetchPermissionByRoleName(String roleName) {

        List<PermissionList> roleList = new ArrayList<>();
        try {
            log.info("Fetching Configured Role List");
            roleList = permissionListRepo.getPermissionListByRoleName(roleName);
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching Role List");
        }
        return roleList;
    }

    @Transactional
    public Boolean saveNewUser(SaveUserDTO saveUserDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long roleId = 0L;
        try {
            if (userRepo.checkIfUserAlreadyExists(saveUserDTO.getEmail()) > 0) {
                if (saveUserDTO.getCustomRole()) {
                    roleId = saveNewRoleAndReturnId(saveUserDTO.getRole(), auth.getName(), new Date());
                } else {
                    //Role Already Exist
                    roleId = roleRepo.findByRoleName(saveUserDTO.getRole()).get().getId();
                }
                savePermissionNative(saveUserDTO.getPermissionList(), roleId);
                saveNewUserNative(saveUserDTO.getEmail(), saveUserDTO.getPassword(), roleId);
                saveUserProperty(saveUserDTO);
                return true;
            } else {
                log.error("User Already Exists");
                return false;
            }
        } catch (Exception e) {
            log.error("User Not Saved");
            return false;
        }

    }

    @Transactional
    public Long saveNewRoleAndReturnId(String roleName, String createdBy, Date creationDate) {
        try {
            roleRepo.saveNewRoleNative(roleName, createdBy, creationDate);
            return roleRepo.findByRoleName(roleName).get().getId();
        } catch (Exception e) {
            log.error("Exception Occurred While Creating New Role" + e);
            return 0L;
        }
    }

    @Transactional
    private void saveNewUserNative(String email, String password, Long roleId) {
        try {
            userRepo.saveNewUserNative(email, getPasswordHashed(password), false, roleId);
        } catch (Exception e) {
            log.error("Exception Occurred While Saving New User" + e);
        }
    }

    @Transactional
    private void savePermissionNative(List<String> permissions, Long roleId) {
        List<Permissions> permissionsList = new ArrayList<>();
        List<PermissionList> permissionListList = permissionListRepo.getPermissionListByPermissionNames(permissions);
        for (PermissionList pl : permissionListList) {
            Permissions permissions1 = new Permissions();
            permissions1.setRoleId(roleId);
            permissions1.setPermissionId(pl.getId());
            permissionsList.add(permissions1);
        }
        permissionRepo.saveAll(permissionsList);
    }

    @Transactional
    private List<UserProperty> saveUserProperty(SaveUserDTO saveUserDTO) {
        List<UserProperty> userPropertyList = new ArrayList<>();
        userPropertyList.add(addPropertyName(saveUserDTO.getName()));
        userPropertyList.add(addLastName(saveUserDTO.getLastName()));
        return userPropertyRepo.saveAll(userPropertyList);
    }

    private UserProperty addPropertyName(String name) {
        UserProperty userProperty = new UserProperty();
        userProperty.setPropertyKey("name");
        userProperty.setPropertyValue(name);
        return userProperty;
    }

    private UserProperty addLastName(String lastName) {
        UserProperty userProperty = new UserProperty();
        userProperty.setPropertyKey("lastName");
        userProperty.setPropertyValue(lastName);
        return userProperty;
    }

    private String getPasswordHashed(String password) {
        return passwordEncoder()
                .encode(new String(
                        Base64.getDecoder()
                                .decode(password)));

    }

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
