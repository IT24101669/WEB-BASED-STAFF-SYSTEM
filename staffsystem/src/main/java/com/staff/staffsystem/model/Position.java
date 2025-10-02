package com.staff.staffsystem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "positions")
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String level;

    private String reportsTo;

    @Column(nullable = false)
    private String salaryRange;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String responsibilities;

    @Column(nullable = false)
    private String status;

    public Position() {}

    public Position(String title, String code, String department, String level,
                    String reportsTo, String salaryRange,
                    String responsibilities, String status) {
        this.title = title;
        this.code = code;
        this.department = department;
        this.level = level;
        this.reportsTo = reportsTo;
        this.salaryRange = salaryRange;
        this.responsibilities = responsibilities;
        this.status = status;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getReportsTo() { return reportsTo; }
    public void setReportsTo(String reportsTo) { this.reportsTo = reportsTo; }

    public String getSalaryRange() { return salaryRange; }
    public void setSalaryRange(String salaryRange) { this.salaryRange = salaryRange; }

    public String getResponsibilities() { return responsibilities; }
    public void setResponsibilities(String responsibilities) { this.responsibilities = responsibilities; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
