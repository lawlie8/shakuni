package org.lawlie8.shakuni.web.user;

import org.lawlie8.shakuni.entity.User.PermissionList;
import org.lawlie8.shakuni.entity.User.Role;
import org.lawlie8.shakuni.web.user.util.SaveUserDTO;
import org.lawlie8.shakuni.web.user.util.UserInfoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/app")
public class UserResource {

    private static final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user/all/get", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllUsers() {
        List<UserInfoDTO> usersList = new ArrayList<>();
        try {
            log.info("Rest Call to Fetch All Users");
            usersList = userService.fetchAllUsers();
        } catch (Exception e) {
            log.error("Error Occurred While Fetching Users", e.getStackTrace());
            return new ResponseEntity<>("Error While Fetching Users", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(usersList, HttpStatus.OK);

    }

    @RequestMapping(value = "/user/role/all/get", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllRoles() {
        List<Role> roleList = new ArrayList<>();
        try {
            log.info("Rest Call to Fetch All Roles");
            roleList = userService.fetchAllRoles();
        } catch (Exception e) {
            log.error("Error Occurred While Fetching Roles", e.getStackTrace());
            return new ResponseEntity<>("Error While Fetching Roles", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(roleList, HttpStatus.OK);

    }

    @RequestMapping(value = "/user/permission/all/get", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllPermission() {
        List<PermissionList> roleList = new ArrayList<>();
        try {
            log.info("Rest Call to Fetch All Roles");
            roleList = userService.fetchAllPermission();
        } catch (Exception e) {
            log.error("Error Occurred While Fetching Roles", e.getStackTrace());
            return new ResponseEntity<>("Error While Fetching Roles", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(roleList, HttpStatus.OK);

    }


    @RequestMapping(value = "/user/permission/name/get/{roleName}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPermissionByRoleName(@PathVariable String roleName) {
        List<PermissionList> roleList = new ArrayList<>();
        try {
            log.info("Rest Call to Fetch All Roles");
            roleList = userService.fetchPermissionByRoleName(roleName);
        } catch (Exception e) {
            log.error("Error Occurred While Fetching Roles", e.getStackTrace());
            return new ResponseEntity<>("Error While Fetching Roles", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(roleList, HttpStatus.OK);
    }


    @RequestMapping(value = "/user/save", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveNewUser(@RequestBody SaveUserDTO saveUserDTO) {
        Boolean isUserSaved = false;
        try {
            log.info("Rest Call to Save User");
            if (saveUserDTO.getPassword().equals(saveUserDTO.getRePassword())) {
                isUserSaved = userService.saveNewUser(saveUserDTO);
            } else {
                return new ResponseEntity<>("Password Must Match", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("Error Occurred While Saving User", e.getStackTrace());
            return new ResponseEntity<>("Error While Saving User Roles", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(isUserSaved, HttpStatus.OK);
    }


}
