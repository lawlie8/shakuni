package org.lawlie8.shakuni.web;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/web/config")
public class ApplicationDetailsResource {

    @RequestMapping(path = "/version",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchVersion(){
        return ResponseEntity.ok().body("0.1");
    }

    @RequestMapping(path = "/info/latest",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchLatestersionInfo(){
        return ResponseEntity.ok().body("Whats New: Everything's new");
    }

}
