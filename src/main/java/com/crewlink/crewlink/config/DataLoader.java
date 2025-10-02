package com.crewlink.crewlink.config;

import com.crewlink.crewlink.entity.User;
import com.crewlink.crewlink.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // This is constructor injection, which is the recommended way.
    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) { // Removed "throws Exception" as it's not needed
        // Create test users if they don't exist
        createUserIfNotFound("administration", "password123", "ADMINISTRATION");
        createUserIfNotFound("department", "password123", "DEPARTMENT");
        createUserIfNotFound("hr", "password123", "HR");
        createUserIfNotFound("finance", "password123", "FINANCE");
        createUserIfNotFound("project", "password123", "PROJECT");
        createUserIfNotFound("executive", "password123", "EXECUTIVE");
        createUserIfNotFound("employee", "password123", "EMPLOYEE");
    }

    private void createUserIfNotFound(String username, String password, String role) {
        if (userRepository.findByUsername(username).isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(role);
            user.setEnabled(true);
            userRepository.save(user);
        }
    }
}
