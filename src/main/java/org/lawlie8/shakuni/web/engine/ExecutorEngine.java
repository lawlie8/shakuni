package org.lawlie8.shakuni.web.engine;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Configuration
public class ExecutorEngine {

    @Bean
    public ExecutorService getExecutorService() {
        return Executors.newFixedThreadPool(20);
    }
}
