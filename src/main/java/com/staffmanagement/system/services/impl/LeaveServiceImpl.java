package com.staffmanagement.system.services.impl;

import com.staffmanagement.system.dto.LeaveDTO;
import com.staffmanagement.system.entities.Employee;
import com.staffmanagement.system.entities.Leave;
import com.staffmanagement.system.exceptions.InsufficientLeaveBalanceException;
import com.staffmanagement.system.exceptions.ResourceNotFoundException;
import com.staffmanagement.system.repositories.LeaveRepository;
import com.staffmanagement.system.services.interfaces.LeaveService;
import com.staffmanagement.system.services.interfaces.PayrollService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final PayrollService payrollService;

    // Assume annual leave balance = 20 days
    private static final int ANNUAL_LEAVE_BALANCE = 20;

    public LeaveServiceImpl(LeaveRepository leaveRepository,
                            PayrollService payrollService) {
        this.leaveRepository = leaveRepository;
        this.payrollService = payrollService;
    }

    @Override
    public LeaveDTO applyForLeave(Long employeeId, LocalDate start, LocalDate end, String type, String reason) {
        int days = (int) ChronoUnit.DAYS.between(start, end) + 1;
        int used = calculateUsedLeaveBalance(employeeId);

        if (used + days > ANNUAL_LEAVE_BALANCE) {
            throw new InsufficientLeaveBalanceException("Insufficient leave balance.");
        }

        Leave leave = new Leave();
        Employee emp = new Employee();
        emp.setId(employeeId);
        leave.setEmployee(emp);
        leave.setStartDate(start);
        leave.setEndDate(end);
        leave.setType(type);
        leave.setReason(reason);
        leave.setStatus("PENDING");
        leave.setBalanceUsed(days);

        Leave saved = leaveRepository.save(leave);
        return mapToDTO(saved);
    }

    @Override
    public List<LeaveDTO> getPendingLeaveRequests() {
        return leaveRepository.findByStatus("PENDING")
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public int getLeaveBalance(Long employeeId) {
        int used = calculateUsedLeaveBalance(employeeId);
        return ANNUAL_LEAVE_BALANCE - used;
    }

    @Override
    public List<LeaveDTO> getLeaveHistory(Long employeeId) {
        return leaveRepository.findByEmployeeId(employeeId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public LeaveDTO approveOrRejectLeave(Long leaveId, String newStatus) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found"));

        if (!"PENDING".equals(leave.getStatus())) {
            throw new RuntimeException("Leave already processed.");
        }

        leave.setStatus(newStatus);
        Leave updated = leaveRepository.save(leave);

        if ("APPROVED".equals(newStatus)) {
            payrollService.updatePayrollBasedOnLeave(updated.getId());
        }

        return mapToDTO(updated);
    }

    @Override
    public LeaveDTO editLeave(Long leaveId, LocalDate newStart, LocalDate newEnd, String newReason) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found"));

        if (!"PENDING".equals(leave.getStatus())) {
            throw new RuntimeException("Cannot edit approved/rejected leave.");
        }

        int newDays = (int) ChronoUnit.DAYS.between(newStart, newEnd) + 1;
        int used = calculateUsedLeaveBalance(leave.getEmployee().getId()) - leave.getBalanceUsed();

        if (used + newDays > ANNUAL_LEAVE_BALANCE) {
            throw new InsufficientLeaveBalanceException("Insufficient leave balance.");
        }

        leave.setStartDate(newStart);
        leave.setEndDate(newEnd);
        leave.setReason(newReason);
        leave.setBalanceUsed(newDays);

        Leave updated = leaveRepository.save(leave);
        return mapToDTO(updated);
    }

    @Override
    public void cancelLeave(Long leaveId) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found"));

        if (!"PENDING".equals(leave.getStatus())) {
            throw new RuntimeException("Cannot cancel approved/rejected leave.");
        }

        leaveRepository.deleteById(leaveId);
    }

    @Override
    public List<LeaveDTO> generateLeaveReport(LocalDate start, LocalDate end) {
        return leaveRepository.findAll().stream()
                .filter(l -> !l.getStartDate().isAfter(end) && !l.getEndDate().isBefore(start))
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public void deleteLeave(Long leaveId) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found"));

        if ("APPROVED".equals(leave.getStatus())) {
            payrollService.updatePayrollBasedOnLeave(leaveId); // Could be revert logic
        }

        leaveRepository.deleteById(leaveId);
    }

    // ---------------- Utility Methods ----------------

    private int calculateUsedLeaveBalance(Long employeeId) {
        Integer used = leaveRepository.calculateUsedLeaveBalance(employeeId);
        return used != null ? used : 0;
    }

    private LeaveDTO mapToDTO(Leave leave) {
        return new LeaveDTO(
                leave.getId(),
                leave.getEmployee().getId(),
                leave.getStartDate(),
                leave.getEndDate(),
                leave.getType(),
                leave.getStatus(),
                leave.getReason(),
                leave.getBalanceUsed()
        );
    }
}
