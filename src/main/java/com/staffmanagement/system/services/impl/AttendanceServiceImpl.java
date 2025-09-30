package com.staffmanagement.system.services.impl;

import com.staffmanagement.system.dto.AttendanceDTO;
import com.staffmanagement.system.entities.Attendance;
import com.staffmanagement.system.entities.Employee;
import com.staffmanagement.system.entities.Leave;
import com.staffmanagement.system.exceptions.ResourceNotFoundException;
import com.staffmanagement.system.repositories.AttendanceRepository;
import com.staffmanagement.system.repositories.LeaveRepository;
import com.staffmanagement.system.services.interfaces.AttendanceService;
import com.staffmanagement.system.services.interfaces.PayrollService;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;
    private final PayrollService payrollService;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository,
                                 LeaveRepository leaveRepository,
                                 PayrollService payrollService) {
        this.attendanceRepository = attendanceRepository;
        this.leaveRepository = leaveRepository;
        this.payrollService = payrollService;
    }

    @Override
    public AttendanceDTO markAttendance(Long employeeId, LocalDate date, String status, String notes) {
        if (hasApprovedLeave(employeeId, date)) {
            throw new RuntimeException("Cannot mark attendance during approved leave.");
        }
        Attendance attendance = new Attendance();
        Employee emp = new Employee();
        emp.setId(employeeId);
        attendance.setEmployee(emp);
        attendance.setDate(date);
        attendance.setStatus(status);
        attendance.setNotes(notes);

        Attendance saved = attendanceRepository.save(attendance);
        payrollService.updatePayrollBasedOnAttendance(employeeId, date, status);

        return new AttendanceDTO(saved.getId(), emp.getId(), saved.getDate(), saved.getStatus(), saved.getNotes());
    }

    @Override
    public List<AttendanceDTO> getAttendanceHistory(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId)
                .stream()
                .map(a -> new AttendanceDTO(a.getId(), a.getEmployee().getId(), a.getDate(), a.getStatus(), a.getNotes()))
                .toList();
    }

    @Override
    public List<AttendanceDTO> generateAttendanceReport(Long employeeId, LocalDate start, LocalDate end) {
        return attendanceRepository.generateAttendanceReport(employeeId, start, end)
                .stream()
                .map(a -> new AttendanceDTO(a.getId(), a.getEmployee().getId(), a.getDate(), a.getStatus(), a.getNotes()))
                .toList();
    }

    @Override
    public AttendanceDTO updateAttendance(Long attendanceId, String newStatus, String notes) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found"));
        attendance.setStatus(newStatus);
        attendance.setNotes(notes);
        Attendance updated = attendanceRepository.save(attendance);

        payrollService.updatePayrollBasedOnAttendance(updated.getEmployee().getId(), updated.getDate(), newStatus);

        return new AttendanceDTO(updated.getId(), updated.getEmployee().getId(), updated.getDate(), updated.getStatus(), updated.getNotes());
    }

    @Override
    public void deleteAttendance(Long attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found"));
        attendanceRepository.deleteById(attendanceId);
        payrollService.updatePayrollBasedOnAttendance(attendance.getEmployee().getId(), attendance.getDate(), "DELETED");
    }

    private boolean hasApprovedLeave(Long employeeId, LocalDate date) {
        List<Leave> leaves = leaveRepository.findOverlappingLeaves(employeeId, date, date);
        return leaves.stream().anyMatch(l -> "APPROVED".equals(l.getStatus()));
    }
}
