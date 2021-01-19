package com.hubtech.backend.controller;

import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.Payment;
import com.hubtech.backend.entity.Product;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.MainCategoryService;
import com.hubtech.backend.service.PaymentService;
import com.hubtech.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

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
    public ResponseEntity<Response> save(@RequestBody Payment payment) {
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