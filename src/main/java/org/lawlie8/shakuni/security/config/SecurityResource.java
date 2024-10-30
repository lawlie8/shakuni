package org.lawlie8.shakuni.security.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/web/security")
public class SecurityResource {

    @RequestMapping(path = "/logreq",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchLatestersionInfo(){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Required");
    }

}
