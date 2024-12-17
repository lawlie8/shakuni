package org.lawlie8.shakuni.web.engine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@Configuration
public class ExecutorEngine {

    private static final Logger log = LoggerFactory.getLogger(ExecutorEngine.class);

    @Bean
    public ThreadPoolTaskScheduler getThreadPoolTaskExecutor() {
        log.info("Creating New Fixed ThreadPool with {} Threads",20);
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(20);
        threadPoolTaskScheduler.initialize();
        return threadPoolTaskScheduler;
    }
}
