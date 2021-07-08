package com.hubtech.backend.service;

import com.hubtech.backend.dao.CommentDAO;
import com.hubtech.backend.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentDAO commentDAO;

    public List<Comment> get(String pslug) {
        return commentDAO.get(pslug);
    }
    public Comment save(Comment comment) {
        return commentDAO.save(comment);
    }
    public void delete(int id) {
        commentDAO.delete(id);
    }
}
