package org.lawlie8.shakuni.web.jobs.tasks;

import org.lawlie8.shakuni.entity.jobs.Tasks;
import org.lawlie8.shakuni.repo.TaskRepo;
import org.lawlie8.shakuni.web.jobs.util.NewTaskDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TasksService {

    private static final Logger log = LoggerFactory.getLogger(TasksService.class);

    @Autowired
    private TaskRepo taskRepo;

    public boolean saveNewTask(NewTaskDTO newTaskDTO){
        return true;
    }

    /**
     *
     * @param jobId
     * @return List of Tasks Object
     */
    public List<Tasks> getTaskByJobId(Long jobId){
        List<Tasks> tasksList = new ArrayList<>();
        try {
            log.debug("Fetching Tasks for Job with Id : {}",jobId);
            tasksList = taskRepo.findByJobId(jobId);
        }catch (Exception e){
            log.error("Exception Occurred While Fetching Tasks with Job with Id : {}",e.getStackTrace());
        }
        return tasksList;
    }
}
