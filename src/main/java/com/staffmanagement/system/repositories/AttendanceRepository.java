package com.staffmanagement.system.repositories;

import com.staffmanagement.system.entities.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmployeeId(Long employeeId);

    @Query("SELECT a FROM Attendance a WHERE a.employee.id = :employeeId AND a.date BETWEEN :start AND :end")
    List<Attendance> generateAttendanceReport(Long employeeId, LocalDate start, LocalDate end);
}
