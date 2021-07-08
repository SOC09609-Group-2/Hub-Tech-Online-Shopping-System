package com.hubtech.backend.dao;

import com.hubtech.backend.entity.Comment;
import com.hubtech.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommentDAO {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> get(String pslug) {
        return commentRepository.getComment(pslug);
    }

    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    public void delete(int id) {
        commentRepository.deleteById(id);
    }

}
