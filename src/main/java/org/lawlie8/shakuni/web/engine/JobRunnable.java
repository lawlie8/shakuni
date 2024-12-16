package org.lawlie8.shakuni.web.engine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JobRunnable implements Runnable{

    private static final Logger log = LoggerFactory.getLogger(JobRunnable.class);
    private Long jobId;

    public JobRunnable(Long jobId){
        this.jobId = jobId;
    }

    @Override
    public void run() {
        log.info("Executing Task with id : {}",jobId);
    }
}
