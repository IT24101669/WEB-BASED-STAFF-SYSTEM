package com.staffmanagement.system.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {

    @GetMapping("/redirect")
    public String redirectAfterLogin(Authentication auth) {
        if (auth != null && auth.getAuthorities() != null) {
            boolean isEmployee = auth.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));

            boolean isHr = auth.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_HR"));

            if (isEmployee) {
                return "redirect:/employee/dashboard";
            } else if (isHr) {
                return "redirect:/hr/dashboard";
            }
        }
        // fallback if no role matches
        return "redirect:/login?error";
    }
}
