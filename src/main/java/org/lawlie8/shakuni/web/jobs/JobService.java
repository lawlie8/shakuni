package org.lawlie8.shakuni.web.jobs;


import org.lawlie8.shakuni.entity.jobs.Jobs;
import org.lawlie8.shakuni.repo.JobsRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private static final Logger log = LoggerFactory.getLogger(JobService.class);

    @Autowired
    private JobsRepo jobsRepo;

    public List<Jobs> fetchAllJobs(Integer page,Integer size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<Jobs> jobsList= null;
        try {
            jobsList = jobsRepo.findAll(pageable);
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching All Jobs List {}", e.getStackTrace());
        }
        return jobsList.getContent();
    }

    public Optional<Jobs> fetchJobDataById(Long id) {
        try {
            return jobsRepo.findById(id);
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching All Jobs List {}", e.getStackTrace());
            return null;
        }
    }
    public Long fetchAllJobSize() {
        try {
            return jobsRepo.count();
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching All Jobs List {}", e.getStackTrace());
            return null;
        }
    }


}