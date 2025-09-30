package com.staffmanagement.system.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "leaves")
@Data
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    private LocalDate startDate;
    private LocalDate endDate;
    private String type;    // SICK, CASUAL, ANNUAL
    private String status;  // PENDING, APPROVED, REJECTED
    private String reason;
    private int balanceUsed;
}
