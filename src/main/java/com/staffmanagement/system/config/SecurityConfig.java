package com.staffmanagement.system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/attendance/mark", "/api/leave/apply", "/api/leave/balance/**", "/api/leave/history/**").hasRole("EMPLOYEE")
                        .requestMatchers("/api/attendance/report", "/api/leave/pending", "/api/leave/report", "/api/attendance/{id}", "/api/leave/{id}/status", "/api/leave/{id}").hasRole("HR")
                        .requestMatchers("/public/**").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic();
        return http.build();
    }
}