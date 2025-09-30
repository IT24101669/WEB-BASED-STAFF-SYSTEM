package com.staffmanagement.system.services.interfaces;

import com.staffmanagement.system.dto.AttendanceDTO;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    AttendanceDTO markAttendance(Long employeeId, LocalDate date, String status, String notes);
    List<AttendanceDTO> getAttendanceHistory(Long employeeId);
    List<AttendanceDTO> generateAttendanceReport(Long employeeId, LocalDate start, LocalDate end);
    AttendanceDTO updateAttendance(Long attendanceId, String newStatus, String notes);
    void deleteAttendance(Long attendanceId);
}
