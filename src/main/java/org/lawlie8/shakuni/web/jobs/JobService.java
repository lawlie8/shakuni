package org.lawlie8.shakuni.web.jobs;


import org.lawlie8.shakuni.entity.jobs.Jobs;
import org.lawlie8.shakuni.repo.JobsRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private static final Logger log = LoggerFactory.getLogger(JobService.class);

    @Autowired
    private JobsRepo jobsRepo;

    public List<Jobs> fetchAllJobs() {
        List<Jobs> jobsList = new ArrayList<>();
        try {
            jobsList = jobsRepo.findAll();
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching All Jobs List {}", e.getStackTrace());
        }
        return jobsList;
    }

    public Optional<Jobs> fetchJobDataById(Long id) {
        try {
            return jobsRepo.findById(id);
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching All Jobs List {}", e.getStackTrace());
            return null;
        }
    }


}
