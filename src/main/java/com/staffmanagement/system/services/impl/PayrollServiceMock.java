package com.staffmanagement.system.services.impl;

import com.staffmanagement.system.services.interfaces.PayrollService;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class PayrollServiceMock implements PayrollService {
    @Override
    public void updatePayrollBasedOnAttendance(Long employeeId, LocalDate date, String attendanceStatus) {
        System.out.println("Mock payroll update (Attendance) -> Employee: " + employeeId + " | " + date + " | " + attendanceStatus);
    }

    @Override
    public void updatePayrollBasedOnLeave(Long leaveId) {
        System.out.println("Mock payroll update (Leave) -> Leave ID: " + leaveId);
    }
}
