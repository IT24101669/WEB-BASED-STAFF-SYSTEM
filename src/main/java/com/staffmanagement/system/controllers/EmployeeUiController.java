package com.staffmanagement.system.controllers;

import com.staffmanagement.system.dto.AttendanceDTO;
import com.staffmanagement.system.dto.LeaveDTO;
import com.staffmanagement.system.services.interfaces.AttendanceService;
import com.staffmanagement.system.services.interfaces.LeaveService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/employee")
public class EmployeeUiController {

    private final AttendanceService attendanceService;
    private final LeaveService leaveService;

    public EmployeeUiController(AttendanceService attendanceService, LeaveService leaveService) {
        this.attendanceService = attendanceService;
        this.leaveService = leaveService;
    }

    @GetMapping({"", "/dashboard"})
    public String dashboard() {
        return "employee/dashboard";
    }

    @GetMapping("/attendance")
    public String attendanceForm(Model model, @RequestParam(required = false) Long employeeId) {
        // optional: prefill employeeId
        if (employeeId != null) model.addAttribute("employeeId", employeeId);
        return "employee/attendance";
    }

    @PostMapping("/attendance/submit")
    public String submitAttendance(@RequestParam Long employeeId,
                                   @RequestParam String date,
                                   @RequestParam String status,
                                   @RequestParam(required = false) String notes,
                                   RedirectAttributes ra) {
        try {
            LocalDate ld = LocalDate.parse(date);
            attendanceService.markAttendance(employeeId, ld, status, notes);
            ra.addFlashAttribute("success", "Attendance marked successfully.");
        } catch (Exception e) {
            ra.addFlashAttribute("error", "Failed to mark attendance: " + e.getMessage());
        }
        return "redirect:/employee/attendance";
    }

    @GetMapping("/leave")
    public String leaveForm() {
        return "employee/leave";
    }

    @PostMapping("/leave/apply")
    public String applyLeave(@RequestParam Long employeeId,
                             @RequestParam String startDate,
                             @RequestParam String endDate,
                             @RequestParam String type,
                             @RequestParam String reason,
                             RedirectAttributes ra) {
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            LeaveDTO dto = leaveService.applyForLeave(employeeId, start, end, type, reason);
            ra.addFlashAttribute("success", "Leave applied (ID: " + dto.id() + ")");
        } catch (Exception e) {
            ra.addFlashAttribute("error", "Failed to apply leave: " + e.getMessage());
        }
        return "redirect:/employee/leave";
    }

    @GetMapping("/history")
    public String history(@RequestParam Long employeeId, Model model) {
        List<AttendanceDTO> attendance = attendanceService.getAttendanceHistory(employeeId);
        List<LeaveDTO> leaves = leaveService.getLeaveHistory(employeeId);
        model.addAttribute("attendance", attendance);
        model.addAttribute("leaves", leaves);
        model.addAttribute("employeeId", employeeId);
        return "employee/history";
    }
}
