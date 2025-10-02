package com.staffmanagement.system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/css/**", "/js/**", "/images/**").permitAll() // static files
                        .requestMatchers("/", "/login").permitAll() // login page open
                        .requestMatchers("/employee/**").hasRole("EMPLOYEE")
                        .requestMatchers("/hr/**").hasRole("HR")
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")        // use your Thymeleaf login.html
                        .defaultSuccessUrl("/redirect", true) // custom redirect after login
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails employee = User.withUsername("employee")
                .password("{noop}password") // plain password for testing
                .roles("EMPLOYEE")
                .build();

        UserDetails hr = User.withUsername("hr")
                .password("{noop}password")
                .roles("HR")
                .build();

        return new InMemoryUserDetailsManager(employee, hr);
    }
}
