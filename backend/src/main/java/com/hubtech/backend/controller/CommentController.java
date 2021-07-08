package com.hubtech.backend.controller;

import com.hubtech.backend.entity.Comment;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
public class CommentController{
    @Autowired
    private CommentService commentService;

    @SubscribeMapping("/comments/{slug}/get")
    public List<Comment> findAll(@DestinationVariable String slug) {
        return commentService.get(slug);
    }

    @MessageMapping("/comments/create")
    @SendTo("/topic/comments/create")
    public ResponseEntity<Response> save(@RequestBody Comment comment) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(commentService.save(comment), new Date()));
    }
    @DeleteMapping("/comment/delete")
    public ResponseEntity<Response> delete(@RequestParam("id") int id) {
        commentService.delete(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(true, new Date()));
    }
}
