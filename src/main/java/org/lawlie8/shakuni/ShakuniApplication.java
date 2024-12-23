package org.lawlie8.shakuni;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableJpaRepositories("org.lawlie8.*")
@ComponentScan(basePackages = "org.lawlie8.*")
@EntityScan("org.lawlie8.*")
@EnableScheduling
@EnableAsync
public class ShakuniApplication extends SpringBootServletInitializer {
	public static void main(String[] args) {
		SpringApplication.run(ShakuniApplication.class, args);
	}



}
