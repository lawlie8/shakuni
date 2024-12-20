package org.lawlie8.shakuni.web.datasource.util;

import jakarta.annotation.PostConstruct;
import org.lawlie8.shakuni.web.jobs.util.JobMessage;
import org.lawlie8.shakuni.web.jobs.util.StatusEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Notification {

    private static MessagingService messagingService;

    private static final Logger log = LoggerFactory.getLogger(MessagingService.class);


    @Autowired
    private MessagingService messagingService0;

    @PostConstruct
    private void init(){
        Notification.messagingService = messagingService0;
    }

    public static void sendMessage(Message message) {
        log.info("Sending Notification with message: {}", message.getMessage());
        try {
            messagingService.sendNotification(message);
        } catch (Exception e) {
            log.error("Error: {}", e);
        }
    }

    public static void sendMessage(String userName,Message message) {
        log.info("Sending Notification with message: {}", message);
        try {
            messagingService.sendNotification(userName, message);
        } catch (Exception e) {
            log.error("Error: {}", e);
        }
    }

    public static void sendJobUpdate(Long id,JobMessage jobMessage) {
        log.debug("Sending Notification to update status for id : {} with status : {}",id);
        try {
            messagingService.sendJobUpdateNotification(id,jobMessage);
        } catch (Exception e) {
            log.error("Error: {}", e);
        }
    }


}
