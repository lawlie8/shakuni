package org.lawlie8.shakuni.web.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/app")
public class UserResource {

    private static final Logger log = LoggerFactory.getLogger(UserResource.class);

    @RequestMapping(value = "/user/all/get",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>  getAllUsers(){
        try {
            log.info("Rest Call to Fetch All Users");
        }catch (Exception e){

        }
        return ResponseEntity.ok("data");
    }

}
