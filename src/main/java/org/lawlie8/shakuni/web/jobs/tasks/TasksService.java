package org.lawlie8.shakuni.web.jobs.tasks;

import jakarta.xml.bind.DatatypeConverter;
import org.apache.commons.lang3.SystemUtils;
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

import javax.swing.filechooser.FileSystemView;
import java.io.*;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
/**
 * Task Service Class Contains Method Required For Creation, Processing, Execution of Job Tasks.
 */
public class TasksService {

    private static final Logger log = LoggerFactory.getLogger(TasksService.class);
    private static final String UNIX_PATH_PREFIX = "/tmp/shakuni/";
    private static final String WIN_PATH_PREFIX = FileSystemView.getFileSystemView().getDefaultDirectory().getPath();
    private static final String APPLICATION_FOLDER_PATH = "\\shakuni\\";


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

    public String fetchTaskDataById(Long taskId) throws IOException {
        Optional<Tasks> tasks = taskRepo.findById(taskId);
        String filePath = tasks.get().getFilePath();
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath)), 1024);
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            stringBuilder.append(line).append('\n');
        }
        br.close();
        return stringBuilder.toString();
    }

    private String generateFilePath(String name) {
        try {
            String filePath;
            String fileName;
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(name.getBytes());
            byte[] digest = md.digest();
            fileName = DatatypeConverter.printHexBinary(digest).toUpperCase();
            if (SystemUtils.IS_OS_WINDOWS) {
                if (checkApplicationFolderExistsWindows()) {
                    log.info("Application Folder Exists");
                    filePath = WIN_PATH_PREFIX + APPLICATION_FOLDER_PATH + fileName + ".sql";
                } else {
                    throw new IOException("Application Folder Does Not Exist or Permission Error");
                }
            } else {
                filePath = UNIX_PATH_PREFIX + APPLICATION_FOLDER_PATH + fileName + ".sql";
            }
            System.out.println(filePath);
            File file = new File(filePath);
            if (file.createNewFile()) {
                log.info("File Created");
            } else {
                log.info("File Already Exists");
            }
            return filePath;
        } catch (Exception e) {
            log.error("Exception Occurred While Generating File Name For : {} , {}", name, e);
            return null;
        }
    }

    private boolean checkApplicationFolderExistsWindows() throws IOException {
        File currentDir = new File(WIN_PATH_PREFIX);
        File[] flist = currentDir.listFiles();
        boolean applicationFolderExists = false;
        for (File f : flist) {
            if (f.isDirectory()) {
                if (f.getName().equals("shakuni")) {
                    applicationFolderExists = true;
                    break;
                }
            }
        }
        if (applicationFolderExists == false) {
            new File(WIN_PATH_PREFIX + APPLICATION_FOLDER_PATH).mkdirs();
            applicationFolderExists = true;
        }
        return applicationFolderExists;
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
