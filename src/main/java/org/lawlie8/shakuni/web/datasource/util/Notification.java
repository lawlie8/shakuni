package org.lawlie8.shakuni.web.datasource.util;

import jakarta.annotation.PostConstruct;
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
}
