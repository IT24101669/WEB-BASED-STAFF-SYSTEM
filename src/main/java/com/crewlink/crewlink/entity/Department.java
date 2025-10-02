package com.crewlink.crewlink.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    private String name;
    private String description;
    private LocalDate establishedDate;

    @OneToOne
    @JoinColumn(name = "head_id")
    private Employee departmentHead;

    // This defines the other side of the relationship from Employee.
    // One Department has many Employees.
    @OneToMany(mappedBy = "department")
    private List<Employee> employees;
}