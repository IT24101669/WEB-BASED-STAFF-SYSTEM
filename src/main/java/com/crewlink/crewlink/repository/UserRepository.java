package com.crewlink.crewlink.repository;

import com.crewlink.crewlink.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // This method is required by Spring Security's UserDetailsService
    Optional<User> findByUsername(String username);
}