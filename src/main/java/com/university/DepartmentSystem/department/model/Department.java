package com.university.department.model;

import lombok.Data;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Data
@Entity
@Table(name = "Department")
public class Department {
    @Id
    @Column(name = "Id")
    private String id; // UUID or custom ID

    @Column(name = "DepartmentId", unique = true, nullable = false)
    @NotBlank(message = "Department ID is required")
    private String departmentId; // e.g., "DEPT001"

    @Column(name = "Name", nullable = false)
    @NotBlank(message = "Name is required")
    private String name; // e.g., "Human Resources"

    @Column(name = "Description")
    private String description; // Optional
}