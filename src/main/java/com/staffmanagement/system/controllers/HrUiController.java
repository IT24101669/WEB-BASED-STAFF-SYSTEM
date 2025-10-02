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
@RequestMapping("/hr")
public class HrUiController {

    private final LeaveService leaveService;
    private final AttendanceService attendanceService;

    public HrUiController(LeaveService leaveService, AttendanceService attendanceService) {
        this.leaveService = leaveService;
        this.attendanceService = attendanceService;
    }

    @GetMapping({"", "/dashboard"})
    public String dashboard() {
        return "hr/dashboard";
    }

    @GetMapping("/leave-requests")
    public String leaveRequests(Model model) {
        List<LeaveDTO> leaves = leaveService.getPendingLeaveRequests();
        model.addAttribute("leaves", leaves);
        return "hr/leave-requests";
    }

    @PostMapping("/leave/{id}/status")
    public String updateLeaveStatus(@PathVariable Long id,
                                    @RequestParam String status,
                                    RedirectAttributes ra) {
        try {
            LeaveDTO updated = leaveService.approveOrRejectLeave(id, status);
            ra.addFlashAttribute("success", "Leave updated: " + updated.status());
        } catch (Exception e) {
            ra.addFlashAttribute("error", "Failed to update leave: " + e.getMessage());
        }
        return "redirect:/hr/leave-requests";
    }

    @GetMapping("/attendance-report")
    public String attendanceReportForm() {
        return "hr/attendance-report";
    }

    @PostMapping("/attendance-report/generate")
    public String generateAttendanceReport(@RequestParam Long employeeId,
                                           @RequestParam String start,
                                           @RequestParam String end,
                                           Model model,
                                           RedirectAttributes ra) {
        try {
            LocalDate s = LocalDate.parse(start);
            LocalDate e = LocalDate.parse(end);
            List<AttendanceDTO> report = attendanceService.generateAttendanceReport(employeeId, s, e);
            model.addAttribute("attendance", report);
            model.addAttribute("employeeId", employeeId);
        } catch (Exception ex) {
            ra.addFlashAttribute("error", "Failed to generate report: " + ex.getMessage());
            return "redirect:/hr/attendance-report";
        }
        return "hr/attendance-report";
    }
}
