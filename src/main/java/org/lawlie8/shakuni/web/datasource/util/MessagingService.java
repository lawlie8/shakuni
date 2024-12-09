package org.lawlie8.shakuni.web.datasource.util;

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
            simpMessagingTemplate.convertAndSend("/notification/all",message.toString());
        }catch (Exception e){
            log.error("Exception Occurred While Sending Message {}",e);
        }
    }
}
