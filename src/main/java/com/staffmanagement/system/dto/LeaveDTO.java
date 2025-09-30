// dto/LeaveDTO.java
package com.staffmanagement.system.dto;

import java.time.LocalDate;

public record LeaveDTO(Long id, Long employeeId, LocalDate startDate, LocalDate endDate,
                       String type, String status, String reason, int balanceUsed) {}
