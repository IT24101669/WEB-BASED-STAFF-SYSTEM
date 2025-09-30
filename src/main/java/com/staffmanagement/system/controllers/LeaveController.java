package com.staffmanagement.system.controllers;

import com.staffmanagement.system.dto.LeaveDTO;
import com.staffmanagement.system.services.interfaces.LeaveService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    // CREATE (Employee applies for leave)
    @PostMapping("/apply")
    public ResponseEntity<LeaveDTO> applyForLeave(
            @RequestParam Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam String type,
            @RequestParam String reason) {
        return ResponseEntity.ok(leaveService.applyForLeave(employeeId, startDate, endDate, type, reason));
    }

    // READ pending requests (HR)
    @GetMapping("/pending")
    public ResponseEntity<List<LeaveDTO>> getPendingRequests() {
        return ResponseEntity.ok(leaveService.getPendingLeaveRequests());
    }

    // READ balance
    @GetMapping("/balance/{employeeId}")
    public ResponseEntity<Integer> getLeaveBalance(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveService.getLeaveBalance(employeeId));
    }

    // READ history
    @GetMapping("/history/{employeeId}")
    public ResponseEntity<List<LeaveDTO>> getLeaveHistory(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveService.getLeaveHistory(employeeId));
    }

    // UPDATE approve/reject (HR)
    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveDTO> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(leaveService.approveOrRejectLeave(id, status));
    }

    // UPDATE edit (Employee)
    @PutMapping("/{id}")
    public ResponseEntity<LeaveDTO> editLeave(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam String reason) {
        return ResponseEntity.ok(leaveService.editLeave(id, startDate, endDate, reason));
    }

    // CANCEL (Employee)
    @DeleteMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelLeave(@PathVariable Long id) {
        leaveService.cancelLeave(id);
        return ResponseEntity.noContent().build();
    }

    // READ report (HR)
    @GetMapping("/report")
    public ResponseEntity<List<LeaveDTO>> generateReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(leaveService.generateLeaveReport(start, end));
    }

    // DELETE (HR)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeave(@PathVariable Long id) {
        leaveService.deleteLeave(id);
        return ResponseEntity.noContent().build();
    }
}
