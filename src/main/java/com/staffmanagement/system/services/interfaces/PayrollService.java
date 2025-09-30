package com.staffmanagement.system.services.interfaces;

import java.time.LocalDate;

public interface PayrollService {
    void updatePayrollBasedOnAttendance(Long employeeId, LocalDate date, String attendanceStatus);
    void updatePayrollBasedOnLeave(Long leaveId);
}
