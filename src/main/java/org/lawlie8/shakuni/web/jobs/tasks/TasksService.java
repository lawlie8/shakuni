package org.lawlie8.shakuni.web.jobs.tasks;

import jakarta.xml.bind.DatatypeConverter;
import org.lawlie8.shakuni.entity.jobs.Tasks;
import org.lawlie8.shakuni.repo.TaskRepo;
import org.lawlie8.shakuni.web.jobs.util.NewTaskDTO;
import org.lawlie8.shakuni.web.jobs.util.SQLTaskDTO;
import org.lawlie8.shakuni.web.jobs.util.TaskTypeEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
/**
 * Task Service Class Contains Method Required For Creation, Processing, Execution of Job Tasks.
 */
public class TasksService {

    private static final Logger log = LoggerFactory.getLogger(TasksService.class);
    private static final String FILE_PATH_PREFIX = "/tmp/";
    @Autowired
    private TaskRepo taskRepo;

    public boolean saveNewTask(NewTaskDTO newTaskDTO) {
        boolean isTaskSaved = false;
        try {
            if (validateTaskData(newTaskDTO)) {
                Tasks tasks = new Tasks();
                tasks.setTaskName(newTaskDTO.getTaskName());
                tasks.setTaskCreationDate(new Date());
                tasks.setCreatedBy(SecurityContextHolder.getContext().getAuthentication().getName());
                tasks.setJobId(newTaskDTO.getJobId());
                tasks.setTaskTypeEnum(TaskTypeEnum.valueOf(newTaskDTO.getTaskType()));
                tasks.setFilePath(generateFilePath(newTaskDTO.getTaskName()));
                tasks.setDescription(newTaskDTO.getDescription());
                log.debug("Saving New Task with Data : {}", tasks);
                taskRepo.save(tasks);
                isTaskSaved = true;
            }
        } catch (Exception e) {
            log.error("Exception Occurred While Creating New Task With Name : {}", newTaskDTO.getTaskName());
            return isTaskSaved;
        }
        return isTaskSaved;
    }

    /**
     * @param jobId
     * @return List of Tasks Object
     */
    public List<Tasks> getTaskByJobId(Long jobId) {
        List<Tasks> tasksList = new ArrayList<>();
        try {
            log.debug("Fetching Tasks for Job with Id : {}", jobId);
            tasksList = taskRepo.findByJobId(jobId);
        } catch (Exception e) {
            log.error("Exception Occurred While Fetching Tasks with Job with Id : {}", e.getStackTrace());
        }
        return tasksList;
    }

    public List<String> fetchTasksTypes() {
        List<String> taskTypeList = new ArrayList<>();
        taskTypeList.add(TaskTypeEnum.FILE.name());
        taskTypeList.add(TaskTypeEnum.SQL.name());
        return taskTypeList;
    }

    public boolean saveSQlTask(SQLTaskDTO sqlTaskDTO) throws InterruptedException {

        return true;
    }

    private String generateFilePath(String name) {
        try {
            String fileName;
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(name.getBytes());
            byte[] digest = md.digest();
            fileName = DatatypeConverter.printHexBinary(digest).toUpperCase();
            return FILE_PATH_PREFIX + fileName + ".sql";
        } catch (Exception e) {
            log.error("Exception Occurred While Generating File Name For : {}", name);
            return FILE_PATH_PREFIX + name + ".sql";
        }
    }

    private boolean validateTaskData(NewTaskDTO newTaskDTO) {
        if (newTaskDTO.getTaskName().isEmpty()) {
            log.info("Task Name is Null");
            return false;
        } else if (newTaskDTO.getTaskType().isEmpty()) {
            log.info("Task Type is Empty");
            return false;
        } else if (newTaskDTO.getJobId() == null) {
            log.info("Job Id is Null");
            return false;
        }
        return true;
    }
}
