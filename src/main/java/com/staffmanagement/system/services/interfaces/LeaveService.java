package com.staffmanagement.system.services.interfaces;

import com.staffmanagement.system.dto.LeaveDTO;
import java.time.LocalDate;
import java.util.List;

public interface LeaveService {
    LeaveDTO applyForLeave(Long employeeId, LocalDate start, LocalDate end, String type, String reason);
    List<LeaveDTO> getPendingLeaveRequests();
    int getLeaveBalance(Long employeeId);
    List<LeaveDTO> getLeaveHistory(Long employeeId);
    LeaveDTO approveOrRejectLeave(Long leaveId, String newStatus);
    LeaveDTO editLeave(Long leaveId, LocalDate newStart, LocalDate newEnd, String newReason);
    void cancelLeave(Long leaveId);
    List<LeaveDTO> generateLeaveReport(LocalDate start, LocalDate end);
    void deleteLeave(Long leaveId);
}
