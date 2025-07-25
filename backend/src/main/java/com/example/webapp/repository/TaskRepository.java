package com.example.webapp.repository;

import com.example.webapp.model.Task;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.completed = false ORDER BY t.createdAt DESC")
    List<Task> findTop5ByCompletedFalseOrderByCreatedAtDesc(Pageable pageable);

    List<Task> findByCompletedFalseOrderByCreatedAtDesc();
}
