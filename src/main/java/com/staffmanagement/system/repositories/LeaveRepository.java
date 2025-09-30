package com.staffmanagement.system.repositories;

import com.staffmanagement.system.entities.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByEmployeeId(Long employeeId);
    List<Leave> findByStatus(String status);

    @Query("SELECT l FROM Leave l WHERE l.employee.id = :employeeId AND l.startDate <= :end AND l.endDate >= :start")
    List<Leave> findOverlappingLeaves(Long employeeId, LocalDate start, LocalDate end);

    @Query("SELECT SUM(l.balanceUsed) FROM Leave l WHERE l.employee.id = :employeeId AND l.status = 'APPROVED'")
    Integer calculateUsedLeaveBalance(Long employeeId);
}
