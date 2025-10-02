package com.crewlink.crewlink.controller;

import com.crewlink.crewlink.dto.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    // This is constructor injection - the recommended way to inject dependencies.
    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), // This will now resolve correctly
                        loginRequest.getPassword()  // This will now resolve correctly
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // For now, a simple success message is sufficient.
        // Later, we will return a JWT token here.
        return ResponseEntity.ok("User authenticated successfully!");
    }
}
