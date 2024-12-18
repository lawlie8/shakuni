package org.lawlie8.shakuni.web.jobs;


import org.lawlie8.shakuni.entity.jobs.Jobs;
import org.lawlie8.shakuni.repo.JobsRepo;
import org.lawlie8.shakuni.web.engine.JobRunnable;
import org.lawlie8.shakuni.web.jobs.util.ExecutionTypeEnum;
import org.lawlie8.shakuni.web.jobs.util.NewJobDTO;
import org.lawlie8.shakuni.web.jobs.util.StatusEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;

@Service
public class JobService {

    private static final Logger log = LoggerFactory.getLogger(JobService.class);

    @Autowired
    private JobsRepo jobsRepo;

    private final ThreadPoolTaskScheduler threadPoolTaskScheduler;

    @Autowired
    public JobService(ThreadPoolTaskScheduler threadPoolTaskScheduler) {
        this.threadPoolTaskScheduler = threadPoolTaskScheduler;
    }

    public List<Jobs> fetchAllJobs(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Jobs> jobsList = null;
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

    public boolean createNewJob(NewJobDTO newJobDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        try {
            Jobs jobs = new Jobs();
            jobs.setJobName(newJobDTO.getJobName());
            jobs.setCreatedBy(auth.getName());
            jobs.setCreationDate(new Date());
            jobs.setExecutionType(ExecutionTypeEnum.valueOf(newJobDTO.getExecutionType()));
            jobs.setConfiguredDataSourceId(newJobDTO.getSelectedConfiguredDataSourceId());
            jobs.setExecutionPattern(newJobDTO.getExecutionPattern());
            jobs.setDescription(newJobDTO.getDescription());
            jobs.setStatusEnum(StatusEnum.UNTRIGGERED);
            log.debug("Saving Job Entity with data : {}",jobs);
            jobsRepo.save(jobs);

        }catch (Exception e){
            log.error("Exception Occurred While Saving New Job {}",e);
            return false;
        }
        return true;
    }

    public boolean scheduleTask(Long id) {
        JobRunnable jobRunnable = new JobRunnable(id);
        threadPoolTaskScheduler.schedule(jobRunnable, new CronTrigger(""));
        return true;
    }

    public boolean executeTask(Long id) {
        JobRunnable jobRunnable = new JobRunnable(id);
        threadPoolTaskScheduler.execute(jobRunnable);
        return true;
    }


}
