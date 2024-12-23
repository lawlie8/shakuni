package org.lawlie8.shakuni.web.jobs.tasks;

import org.lawlie8.shakuni.repo.TaskRepo;
import org.lawlie8.shakuni.web.jobs.util.NewTaskDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TasksService {

    @Autowired
    private TaskRepo taskRepo;

    public boolean saveNewTask(NewTaskDTO newTaskDTO){
        return true;
    }

}
