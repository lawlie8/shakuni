package org.lawlie8.shakuni.web.engine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Configuration
public class ExecutorEngine {

    private static final Logger log = LoggerFactory.getLogger(ExecutorEngine.class);

    @Bean
    public ExecutorService getExecutorService() {
        log.info("Creating New Fixed ThreadPool with {} Threads",20);
        return Executors.newFixedThreadPool(20);
    }
}
