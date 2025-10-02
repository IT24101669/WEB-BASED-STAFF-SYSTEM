package com.crewlink.crewlink.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1024)
    private String description;

    private String status;
    private String priority;
    private LocalDate dueDate;
    private int progress;
    private String notes;

    // Many Tasks can be assigned to one Employee. This creates the 'assignee_id' foreign key.
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assignee_id")
    private Employee assignee;
}
