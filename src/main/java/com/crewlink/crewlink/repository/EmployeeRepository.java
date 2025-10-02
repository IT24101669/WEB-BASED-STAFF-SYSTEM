package com.crewlink.crewlink.repository;

import com.crewlink.crewlink.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// The @Repository annotation tells Spring to manage this bean.
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Custom query to find an employee by their unique string ID
    Optional<Employee> findByEmployeeId(String employeeId);

    // Custom query for the search functionality
    List<Employee> findByFullNameContainingIgnoreCaseOrEmployeeIdContainingIgnoreCase(String fullName, String employeeId);
}