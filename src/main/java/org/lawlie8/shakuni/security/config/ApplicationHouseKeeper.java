package org.lawlie8.shakuni.security.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Component;

@Component
public class ApplicationHouseKeeper {

    private static final Logger log = LoggerFactory.getLogger(ApplicationHouseKeeper.class);

    private final ThreadPoolTaskScheduler threadPoolTaskScheduler;

    @Autowired
    public ApplicationHouseKeeper(ThreadPoolTaskScheduler threadPoolTaskScheduler) {
        this.threadPoolTaskScheduler = threadPoolTaskScheduler;
    }


    @EventListener(ContextRefreshedEvent.class)
    public void onApplicationStartup(){
        log.info("Executing Application Startup Methods");
    }

    @EventListener(ContextClosedEvent.class)
    public void onApplicationShutdown(){
        log.info("Executing Application Shutdown Methods");
        threadPoolTaskScheduler.shutdown();
    }

}
