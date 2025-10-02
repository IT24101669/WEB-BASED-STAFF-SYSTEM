package com.crewlink.crewlink.repository;

import com.crewlink.crewlink.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// The @Repository annotation is essential for Spring to find this bean.
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // JpaRepository automatically gives us methods like findAll(), findById(), save(), etc.
}