package com.crewlink.crewlink.service;

import com.crewlink.crewlink.entity.Task;
import java.util.List;

public interface TaskService {
    List<Task> findAllTasks();
    Task getTaskById(Long id);
    Task createTask(Task task);
    Task updateTask(Long id, Task taskDetails);
    void deleteTask(Long id);
}