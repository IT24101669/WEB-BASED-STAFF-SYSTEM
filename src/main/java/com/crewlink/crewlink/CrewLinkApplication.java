package com.crewlink.crewlink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// This annotation is crucial for the whole application to work.
@SpringBootApplication
public class CrewLinkApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrewLinkApplication.class, args);
    }

}