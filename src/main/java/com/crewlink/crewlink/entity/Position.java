package com.crewlink.crewlink.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(unique = true)
    private String code;

    private String level;
    private String salaryRange;

    @Column(length = 1024)
    private String responsibilities;

    // Defines the "reports to" hierarchy
    @ManyToOne
    @JoinColumn(name = "reports_to_id")
    private Position reportsTo;

    // This defines the other side of the relationship from Employee.
    // One Position can be held by many Employees.
    @OneToMany(mappedBy = "position")
    private List<Employee> employees;
}