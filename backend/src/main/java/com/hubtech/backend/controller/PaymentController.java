package com.hubtech.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hubtech.backend.entity.Payment;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(path = "/payment")

//@RestController(value = "/users")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;


    @GetMapping
    public ResponseEntity<Response> get() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentService.get(), new Date()));
    }

    @PostMapping
    public ResponseEntity<Response> save( @RequestBody Payment payment) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentService.save(payment), new Date()));
    }

    @PutMapping
    public ResponseEntity<Response> update(@RequestBody Payment payment) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentService.save(payment), new Date()));
    }

    @DeleteMapping
    public ResponseEntity<Response> delete(@RequestParam("id") int id) {
        paymentService.delete(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(true, new Date()));
    }

}
