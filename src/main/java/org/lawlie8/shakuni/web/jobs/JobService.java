package org.lawlie8.shakuni.web.jobs;


import jakarta.transaction.Transactional;
import org.lawlie8.shakuni.entity.jobs.Jobs;
import org.lawlie8.shakuni.repo.JobsRepo;
import org.lawlie8.shakuni.web.datasource.util.Notification;
import org.lawlie8.shakuni.web.engine.JobRunnable;
import org.lawlie8.shakuni.web.jobs.util.ExecutionTypeEnum;
import org.lawlie8.shakuni.web.jobs.util.JobMessage;
import org.lawlie8.shakuni.web.jobs.util.NewJobDTO;
import org.lawlie8.shakuni.web.jobs.util.StatusEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public List<Jobs> fetchRecentJobs() {
        List<Jobs> jobsList = new ArrayList<>();
        try {
            jobsList = jobsRepo.findLastTenJobs();
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

    public Map<String,Long> fetchAllJobSize() {
        try {
            Map<String,Long> countMap = new HashMap<>();
            countMap.put("all", jobsRepo.count());
            countMap.put("completed",jobsRepo.fetchCompletedJobCount());
            return countMap;
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
            jobs.setDatasourceId(newJobDTO.getSelectedDataSourceId());
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
        JobRunnable jobRunnable = new JobRunnable(id,this);
        threadPoolTaskScheduler.schedule(jobRunnable, new CronTrigger(""));
        return true;
    }

    public boolean executeTask(Long id) {
        try {
            JobRunnable jobRunnable = new JobRunnable(id,this);
            threadPoolTaskScheduler.execute(jobRunnable);
        }catch (Exception e){
            log.error("Exception Occurred While Starting Job with id : {}",id);
            return false;
        }
        return true;
    }

    public boolean deleteJobById(Long id) {
        try {
            jobsRepo.deleteById(id);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    /**
     * Initializes Job by id
     * send websocket notification for status change and update job status in database
     * @param id - Job it
     * @return boolean if process is completed without any Error
     */
    public boolean initializeJobById(Long id){
        try {
            jobsRepo.updateStatus(id,StatusEnum.RUNNING.name());
            Notification.sendJobUpdate(id,generateJobMessage(id,StatusEnum.RUNNING.name(), 5f));
        }catch (Exception e){
            log.error("Exception Occurred While Initializing Job with id : {} : {}",id,e);
            return false;
        }
        return true;
    }

    /**
     * Method is Executed When a Job is Completed with or without Exception
     * send related Notification to Front-End from here
     * @param id - Job id
     * @param isError - if Job has Completed with Error
     * @param exceptionMessage - Exception Message to be stored as Result
     * @return
     */
    public boolean finishJobById(Long id,boolean isError,String exceptionMessage){
        try {
            String status = isError ? StatusEnum.ERROR.name() : StatusEnum.COMPLETED.name();
            jobsRepo.updateStatus(id,status);
            Notification.sendJobUpdate(id,generateJobMessage(id,status,100f));
        }catch (Exception e){
            log.error("Exception Occurred While Finishing Job with id : {} : {}",id,e);
            return false;
        }
        return true;
    }

    public static JobMessage generateJobMessage(Long id,String status,Float completionPercentage){
        JobMessage jobMessage = new JobMessage();
        jobMessage.setStatus(status);
        jobMessage.setJobId(id);
        jobMessage.setCompletionPercentage(completionPercentage);
        return  jobMessage;
    }



}
