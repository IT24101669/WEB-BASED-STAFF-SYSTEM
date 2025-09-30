// dto/AttendanceDTO.java
package com.staffmanagement.system.dto;

import java.time.LocalDate;

public record AttendanceDTO(Long id, Long employeeId, LocalDate date, String status, String notes) {}
