package com.crewlink.crewlink.dto;

import lombok.Data;

// This @Data annotation automatically creates getters (like getUsername()) and setters.
@Data
public class LoginRequest {
    private String username;
    private String password;
}
