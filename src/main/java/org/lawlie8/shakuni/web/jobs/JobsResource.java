package org.lawlie8.shakuni.web.jobs;

import org.lawlie8.shakuni.entity.jobs.Jobs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/app")
public class JobsResource {

    private static final Logger log = LoggerFactory.getLogger(JobsResource.class);

    @Autowired
    private JobService jobService;


    @RequestMapping(value = "/jobs/get/all/{page}/{size}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchAllJobs(@PathVariable Integer page,Integer size) {
        List<Jobs> jobsList = new ArrayList<>();
        try {
            log.info("Rest Call to Fetch All configured Jobs");
            jobsList = jobService.fetchAllJobs(page,size);
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching All Configured Jobs");
        }
        return new ResponseEntity<>(jobsList, HttpStatus.OK);
    }

    @RequestMapping(value = "/jobs/get/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchJobById(@PathVariable Long id) {
        try {
            log.info("Rest Call to Fetch Job Data With id : {}",id);
            Optional<Jobs> job =  jobService.fetchJobDataById(id);
            return new ResponseEntity<>(job, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching Job Data With id : {} exception is ; {}",id,e);
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/jobs/get/all/count", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchAllJobsSize() {
        try {
            log.info("Rest Call to Fetch Job count");
            Long count =  jobService.fetchAllJobSize();
            return new ResponseEntity<>(count, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching Job Count {}",e);
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}