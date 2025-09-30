package com.staffmanagement.system.controllers;

import com.staffmanagement.system.dto.AttendanceDTO;
import com.staffmanagement.system.services.interfaces.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/mark")
    public ResponseEntity<AttendanceDTO> markAttendance(@RequestParam Long employeeId,
                                                        @RequestParam LocalDate date,
                                                        @RequestParam String status,
                                                        @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(attendanceService.markAttendance(employeeId, date, status, notes));
    }

    @GetMapping("/history/{employeeId}")
    public ResponseEntity<List<AttendanceDTO>> history(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendanceHistory(employeeId));
    }

    @GetMapping("/report")
    public ResponseEntity<List<AttendanceDTO>> report(@RequestParam Long employeeId,
                                                      @RequestParam LocalDate start,
                                                      @RequestParam LocalDate end) {
        return ResponseEntity.ok(attendanceService.generateAttendanceReport(employeeId, start, end));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceDTO> update(@PathVariable Long id,
                                                @RequestParam String status,
                                                @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(attendanceService.updateAttendance(id, status, notes));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }
}
