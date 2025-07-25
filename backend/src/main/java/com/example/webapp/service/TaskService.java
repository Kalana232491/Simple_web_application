package com.example.webapp.service;

import com.example.webapp.model.Task;
import com.example.webapp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getRecentTasks() {
        return taskRepository.findTop5ByCompletedFalseOrderByCreatedAtDesc(
                PageRequest.of(0, 5)
        );
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Optional<Task> completeTask(Long id) {
        Optional<Task> taskOpt = taskRepository.findById(id);
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            task.setCompleted(true);
            taskRepository.save(task);
            return Optional.of(task);
        }
        return Optional.empty();
    }
}