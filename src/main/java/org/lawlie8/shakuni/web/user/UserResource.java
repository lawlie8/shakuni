package org.lawlie8.shakuni.web.user;

import org.lawlie8.shakuni.entity.Users;
import org.lawlie8.shakuni.web.user.util.UserInfoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/app")
public class UserResource {

    private static final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user/all/get",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>  getAllUsers(){
        List<UserInfoDTO> usersList = new ArrayList<>();
        try {
            log.info("Rest Call to Fetch All Users");
            usersList =  userService.fetchAllUsers();
        }catch (Exception e){
            log.error("Error Occurred While Fetching Users",e.getStackTrace());
            return new ResponseEntity<>("Error While Fetching Users",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(usersList,HttpStatus.OK);

    }

}
