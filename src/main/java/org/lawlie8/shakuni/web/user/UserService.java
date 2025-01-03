package org.lawlie8.shakuni.web.user;

import jakarta.transaction.Transactional;
import org.lawlie8.shakuni.entity.User.*;

import org.lawlie8.shakuni.repo.*;
import org.lawlie8.shakuni.security.config.CustomUserDetails;
import org.lawlie8.shakuni.web.user.util.SaveUserDTO;
import org.lawlie8.shakuni.web.user.util.UserInfoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

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

    @Autowired
    private SessionExpireService sessionExpireService;

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
                userInfoDTO.setRoles(user.getRole());
                userInfoDTO.setUserPropertyList(fetchUserPropertyByUserName(user.getId()));
                userInfoDTO.setPermissionListList(fetchPermissionListByPermissionId(user.getRole()));
                userInfoDTOList.add(userInfoDTO);
            }
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching All Users", e.getStackTrace());
        }
        return userInfoDTOList;
    }

    private List<PermissionList> fetchPermissionListByPermissionId(Role role){
        List<PermissionList> permissionListList = new ArrayList<>();
        permissionListList = permissionListRepo.getPermissionListByRoleName(role.getRoleName());
        return permissionListList;
    }

    private List<UserProperty> fetchUserPropertyByUserName(Long userId){
        List<UserProperty> userPropertyList = new ArrayList<>();
        userPropertyList = userPropertyRepo.fetchUserPropertyListByUserId(userId);
        return userPropertyList;
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
                Long userId = saveNewUserAndReturnId(saveUserDTO.getEmail(), saveUserDTO.getPassword(), roleId);
                saveUserProperty(userId,saveUserDTO);
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
    public Boolean editExistingUser(SaveUserDTO saveUserDTO,Boolean changePassword) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long roleId = 0L;
        String passwordHash = "";
        Optional<Users> users = userRepo.findByUserNameNative(saveUserDTO.getEmail());

        try {
            if (users.isEmpty()) {
                log.error("User Does Not Exist");
                return false;
            } else {
                log.info("Updating User with id : {}",saveUserDTO.getEmail());
                if(changePassword){
                    passwordHash = getPasswordHashed(saveUserDTO.getPassword());
                }else{
                    passwordHash = users.get().getPasswordHash();
                }
                if(users.get().getRole().getRoleName().equals(saveUserDTO.getRole())){
                    log.debug("Role will not be Updated");
                    roleId = users.get().getRole().getId();
                }else{
                    //TODO check if Role Already Exist else Create New Role with Permissions
                    Optional<Role> role = roleRepo.findByRoleName(saveUserDTO.getRole());
                    if(role.isPresent()){
                        log.debug("Role Already Exists Changing Role to : {}",saveUserDTO.getRole());
                        roleId = role.get().getId();
                    }else{
                        log.debug("Role Does Not Exists, Creating New Role with name : {}",saveUserDTO.getRole());
                        roleId = saveNewRoleAndReturnId(saveUserDTO.getRole(), auth.getName(),new Date());
                        savePermissionNative(saveUserDTO.getPermissionList(),roleId);
                    }
                }
                editUserProperty(users.get().getId(),saveUserDTO);
                userRepo.editUserNative(saveUserDTO.getEmail(),passwordHash,roleId);
                sessionExpireService.expireUserSessionByUserName(saveUserDTO.getEmail());
                return true;
            }
        } catch (Exception e) {
            log.error("User Not Saved {}",e);
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
    private Long saveNewUserAndReturnId(String email, String password, Long roleId) {
        try {
            userRepo.saveNewUserNative(email, getPasswordHashed(password), false, roleId);
            return userRepo.findByUserNameNative(email).get().getId();
        } catch (Exception e) {
            log.error("Exception Occurred While Saving New User" + e);
            return 0L;
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
    private List<UserProperty> saveUserProperty(Long userId,SaveUserDTO saveUserDTO) {
        List<UserProperty> userPropertyList = new ArrayList<>();
        userPropertyList.add(addPropertyName(userId,saveUserDTO.getName()));
        userPropertyList.add(addLastName(userId,saveUserDTO.getLastName()));
        return userPropertyRepo.saveAll(userPropertyList);
    }

    @Transactional
    private void editUserProperty(Long userId,SaveUserDTO saveUserDTO) {
       updateUserPropertyName(userId,"name",saveUserDTO.getName());
       updateUserPropertyLastName(userId,"lastName",saveUserDTO.getLastName());
    }

    private void updateUserPropertyName(Long userId,String propertyName,String propertyValue){
        userPropertyRepo.editUserProperty(propertyName,propertyValue,userId);
    }

    private void updateUserPropertyLastName(Long userId,String propertyName,String propertyValue){
        userPropertyRepo.editUserProperty(propertyName,propertyValue,userId);
    }


    private UserProperty addPropertyName(Long userId,String name) {
        UserProperty userProperty = new UserProperty();
        userProperty.setUserId(userId);
        userProperty.setPropertyKey("name");
        userProperty.setPropertyValue(name);
        return userProperty;
    }

    private UserProperty addLastName(Long userId,String lastName) {
        UserProperty userProperty = new UserProperty();
        userProperty.setUserId(userId);
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
