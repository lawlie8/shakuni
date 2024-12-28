package org.lawlie8.shakuni.web.jobs.tasks;

import org.lawlie8.shakuni.entity.jobs.Tasks;
import org.lawlie8.shakuni.web.jobs.util.NewTaskDTO;
import org.lawlie8.shakuni.web.jobs.util.SQLTaskDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/app")
public class TasksResource {
    private static final Logger log = LoggerFactory.getLogger(TasksResource.class);

    @Autowired
    private TasksService tasksService;

    /**
     * This Method Fetches Tasks Related To Job by JobId, Can Return Nothing As Jobs Have No Tasks By Default
     * @param jobId
     * @return - List of Task Objects Created For A Job with Id
     */
    @RequestMapping(value = "/task/get/{jobId}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchTasksByJobId(@PathVariable Long jobId){
        List<Tasks> tasksList = new ArrayList<>();
        try {
            log.info("Rest Call to Fetch Task for Job with Id : {}",jobId);
            tasksList = tasksService.getTaskByJobId(jobId);
        }catch (Exception e){
            log.error("Rest Call to Fetch Tasks for Job with Id Failed Exception is : {}",e.getStackTrace());
        }
        return new ResponseEntity<>(tasksList, HttpStatus.OK);
    }

    @RequestMapping(value = "/task/data/get/{taskId}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchTasksDataById(@PathVariable Long taskId){
        String taskData = "";
        try {
            log.info("Rest Call to Fetch Task Data for Task with Id : {}",taskId);
            taskData = tasksService.fetchTaskDataById(taskId);
        }catch (Exception e){
            e.printStackTrace();
            log.error("Rest Call to Fetch Tasks for Job with Id Failed Exception is : {}",e.getStackTrace());
        }
        return  new ResponseEntity<>(taskData, HttpStatus.OK);
    }

    /**
     * This Method Returns All Task Types That Can be Created in SHAKUNI for a given Job
     * @return - Tasks Type Objects (SQL,File Upload etc.)
     */
    @RequestMapping(value = "/task/get/types",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchTasksTypes(){
        List<String> taskTypeString = new ArrayList<>();
        try {
            log.info("Rest Call to Fetch Task Types");
            taskTypeString = tasksService.fetchTasksTypes();
        }catch (Exception e){
            log.error("Rest Call to Fetch Task Types failed : {}0",e.getStackTrace());
            return new ResponseEntity<>(taskTypeString, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(taskTypeString, HttpStatus.OK);
    }

    /**
     *
     * @param newTaskDTO DTO Class Contains Values Related To Saving New Task
     * @return boolean - New Task Creation Success Value
     */
    @RequestMapping(value = "/task/post/save",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveNewTask(@RequestBody NewTaskDTO newTaskDTO){
        boolean isSaved = false;
        try {
            log.info("Rest Call To Save New Task with Name : {}",newTaskDTO.getTaskName());
            isSaved = tasksService.saveNewTask(newTaskDTO);
        }catch (Exception e){
            log.error("Exception Occurred While Saving New Task at Rest level : {}",e.getMessage());
            return new ResponseEntity<>(isSaved, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(isSaved, HttpStatus.OK);
    }

    /**
     * This Method Saves SQL Editor Data to Respective Task File
     * @param sqlTaskDTO
     * @return - boolean status if file is saved
     */
    @RequestMapping(value = "/task/sql/post/save",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveSQLFileForTask(@RequestBody SQLTaskDTO sqlTaskDTO){
        boolean isSaved = false;
        try {
            log.info("Rest Call To Save New Task with Name : {}",sqlTaskDTO);
            isSaved = tasksService.saveSQlTask(sqlTaskDTO);
        }catch (Exception e){
            log.error("Exception Occurred While Saving SQL Task at Rest level : {}",e.getMessage());
            return new ResponseEntity<>(isSaved, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(isSaved, HttpStatus.OK);
    }
}
