package org.lawlie8.shakuni.web.engine;

import org.lawlie8.shakuni.web.datasource.util.Notification;
import org.lawlie8.shakuni.web.jobs.JobService;
import org.lawlie8.shakuni.web.jobs.util.StatusEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class JobRunnable implements Runnable {

    private static final Logger log = LoggerFactory.getLogger(JobRunnable.class);

    @Autowired
    private JobService jobService;

    private Long jobId;

    public JobRunnable(Long jobId,JobService jobService) {
        this.jobId = jobId;
        this.jobService = jobService;
    }

    @Override
    public void run() {
        boolean isError = false;
        String exceptionMessage = "";
        try {
            log.info("Executing Job with id : {}", jobId);
            if(jobService.initializeJobById(jobId)){
                log.debug("Initialization Job with id : {}",jobId);
                //execute query Execution Code Here
            } else {
                log.error("Job Initialization Failed for id : {}",jobId);
            }

            for(int i = 6;i<95;i++){
                Thread.sleep(300);
                Notification.sendJobUpdate(jobId,jobService.generateJobMessage(jobId, StatusEnum.RUNNING.name(), (float) i));
            }
        } catch (Exception e) {
            isError = true;
            exceptionMessage = e.getMessage();
            //execute error related Code Here
        } finally {
            //execute completionJobById here
            jobService.finishJobById(jobId,isError,exceptionMessage);
            log.info("Job Completed with id : {}", jobId);
        }
    }
}
