package com.staffmanagement.system.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String login() {
        return "login"; // loads login.html
    }

    @GetMapping("/redirect")
    public String redirectAfterLogin(Authentication authentication) {
        if (authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_HR"))) {
            return "redirect:/hr/dashboard";
        } else if (authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"))) {
            return "redirect:/employee/dashboard";
        }
        return "redirect:/login?error";
    }

    @GetMapping("/employee/dashboard")
    public String employeeDashboard() {
        return "employee-dashboard"; // loads employee-dashboard.html
    }

    @GetMapping("/hr/dashboard")
    public String hrDashboard() {
        return "hr-dashboard"; // loads hr-dashboard.html
    }
}
