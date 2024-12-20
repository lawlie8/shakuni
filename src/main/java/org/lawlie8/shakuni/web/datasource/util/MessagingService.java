package org.lawlie8.shakuni.web.datasource.util;

import org.lawlie8.shakuni.web.jobs.util.JobMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessagingService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private static final Logger log = LoggerFactory.getLogger(MessagingService.class);


    public void sendNotification(Message message){
        try {
            simpMessagingTemplate.convertAndSend("/notification/all",message);
        }catch (Exception e){
            log.error("Exception Occurred While Sending Message {}",e);
        }
    }

    public void sendNotification(String userName,Message message){
        try {
            simpMessagingTemplate.convertAndSend(String.format("/notification/%s",userName),message);
        }catch (Exception e){
            log.error("Exception Occurred While Sending Message {}",e);
        }
    }

    public void sendJobUpdateNotification(Long id , JobMessage jobMessage){
        try {
            simpMessagingTemplate.convertAndSend("/notification/job",jobMessage);
        }catch (Exception e){
            log.error("Exception Occurred While Sending Message {}",e);
        }
    }
}
