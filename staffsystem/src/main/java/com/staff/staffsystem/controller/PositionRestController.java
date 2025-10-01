package com.staff.staffsystem.controller;

import com.staff.staffsystem.model.Position;
import com.staff.staffsystem.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/positions")
@CrossOrigin(origins = "http://localhost:3000")
public class PositionRestController {

    @Autowired
    private PositionRepository positionRepository;

    // GET all positions
    @GetMapping
    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }

    // GET one position by ID
    @GetMapping("/{id}")
    public Position getPositionById(@PathVariable int id) {
        return positionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Position not found with id: " + id));
    }

    // CREATE position
    @PostMapping
    public Position createPosition(@RequestBody Position position) {
        return positionRepository.save(position);
    }

    // UPDATE position
    @PutMapping("/{id}")
    public Position updatePosition(@PathVariable int id, @RequestBody Position positionDetails) {
        Position position = positionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Position not found with id: " + id));

        position.setTitle(positionDetails.getTitle());
        position.setCode(positionDetails.getCode());
        position.setDepartment(positionDetails.getDepartment());
        position.setLevel(positionDetails.getLevel());
        position.setReportsTo(positionDetails.getReportsTo());
        position.setSalaryRange(positionDetails.getSalaryRange());
        position.setResponsibilities(positionDetails.getResponsibilities());
        position.setStatus(positionDetails.getStatus());

        return positionRepository.save(position);
    }

    // DELETE position
    @DeleteMapping("/{id}")
    public void deletePosition(@PathVariable int id) {
        positionRepository.deleteById(id);
    }
}