package org.lawlie8.shakuni.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/app/config")
public class ApplicationConfigResource {

    @RequestMapping(path = "/settings/all",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchLatestersionInfo() {
        return new ResponseEntity<>("Every Thing is new", HttpStatus.OK);
    }

}
