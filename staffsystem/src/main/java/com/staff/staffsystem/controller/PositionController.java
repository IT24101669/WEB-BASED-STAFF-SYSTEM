package com.staff.staffsystem.controller;

import com.staff.staffsystem.model.Position;
import com.staff.staffsystem.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/positions")
public class PositionController {

    @Autowired
    private PositionRepository positionRepository;

    // Get all positions
    @GetMapping
    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }

    // Create new position
    @PostMapping
    public Position createPosition(@RequestBody Position position) {
        return positionRepository.save(position);
    }

    // Get single position
    @GetMapping("/{id}")
    public ResponseEntity<Position> getPositionById(@PathVariable int id) {
        return positionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update position
    @PutMapping("/{id}")
    public ResponseEntity<Position> updatePosition(@PathVariable int id, @RequestBody Position updated) {
        return positionRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(updated.getTitle());
                    existing.setCode(updated.getCode());
                    existing.setDepartment(updated.getDepartment());
                    existing.setLevel(updated.getLevel());
                    existing.setReportsTo(updated.getReportsTo());
                    existing.setSalaryRange(updated.getSalaryRange());
                    existing.setResponsibilities(updated.getResponsibilities());
                    existing.setStatus(updated.getStatus());
                    return ResponseEntity.ok(positionRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete position
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePosition(@PathVariable int id) {
        if (positionRepository.existsById(id)) {
            positionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
