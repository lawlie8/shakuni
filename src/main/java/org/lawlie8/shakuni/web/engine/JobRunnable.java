package org.lawlie8.shakuni.web.engine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JobRunnable implements Runnable {

    private static final Logger log = LoggerFactory.getLogger(JobRunnable.class);
    private Long jobId;

    public JobRunnable(Long jobId) {
        this.jobId = jobId;
    }

    @Override
    public void run() {
        try {
            log.info("Executing Job with id : {}", jobId);
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            log.info("Job Completed with id : {}", jobId);
        }
    }
}
