package org.lawlie8.shakuni.web.jobs.tasks;

import org.lawlie8.shakuni.web.jobs.util.NewTaskDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> fetchTasksByJobId(@RequestParam Long jobId){

        return new ResponseEntity<>("", HttpStatus.OK);
    }

    /**
     * This Method Returns All Task Types That Can be Created in SHAKUNI for a given Job
     * @return - Tasks Type Objects (SQL,File Upload etc.)
     */
    @RequestMapping(value = "/task/get/types",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchTasksTypes(){

        return new ResponseEntity<>("", HttpStatus.OK);
    }

    /**
     *
     * @param newTaskDTO DTO Class Contains Values Related To Saving New Task
     * @return boolean - New Task Creation Success Value
     */
    @RequestMapping(value = "/task/post/save",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
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
}
