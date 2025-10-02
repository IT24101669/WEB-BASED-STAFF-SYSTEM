package com.crewlink.crewlink.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String employeeId;
    private String fullName;
    @Column(unique = true)
    private String email;
    private String contactNumber;
    private String address;
    private String status;
    private LocalDate joinDate;
    private BigDecimal salary;

    // --- THIS IS THE OWNING SIDE of the relationship ---
    // It creates the foreign key column in the 'employee' table.
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_username", referencedColumnName = "username")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "position_id")
    private Position position;

    @OneToMany(mappedBy = "assignee")
    private List<Task> tasks;
}
