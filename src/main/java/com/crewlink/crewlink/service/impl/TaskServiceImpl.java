package com.crewlink.crewlink.service.impl;

import com.crewlink.crewlink.entity.Employee;
import com.crewlink.crewlink.entity.Task;
import com.crewlink.crewlink.repository.EmployeeRepository;
import com.crewlink.crewlink.repository.TaskRepository;
import com.crewlink.crewlink.service.TaskService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service // This annotation is crucial! It registers this class as a Spring Bean.
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;

    // Using constructor injection (recommended)
    public TaskServiceImpl(TaskRepository taskRepository, EmployeeRepository employeeRepository) {
        this.taskRepository = taskRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    @Override
    public Task createTask(Task task) {
        task.setStatus("To Do");
        task.setProgress(0);
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task taskDetails) {
        Task existingTask = getTaskById(id);

        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setPriority(taskDetails.getPriority());
        existingTask.setDueDate(taskDetails.getDueDate());
        existingTask.setStatus(taskDetails.getStatus());
        existingTask.setProgress(taskDetails.getProgress());
        existingTask.setNotes(taskDetails.getNotes());

        if (taskDetails.getAssignee() != null && taskDetails.getAssignee().getId() != null) {
            Employee assignee = employeeRepository.findById(taskDetails.getAssignee().getId())
                    .orElse(null);
            existingTask.setAssignee(assignee);
        } else {
            existingTask.setAssignee(null);
        }

        return taskRepository.save(existingTask);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}