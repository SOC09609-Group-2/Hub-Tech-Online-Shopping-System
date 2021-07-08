package com.hubtech.backend.repository;

import com.hubtech.backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query(value = "SELECT * FROM comments WHERE pslug = :pslug" , nativeQuery=true)
    public List<Comment> getComment(@Param("pslug") String pslug);
}
