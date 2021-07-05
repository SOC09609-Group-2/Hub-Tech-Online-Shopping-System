package com.hubtech.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hubtech.backend.entity.PaymentDetail;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.PaymentDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.context.Context;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.DataInput;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/payment_detail")

//@RestController(value = "/users")
public class PaymentDetailController {

	@Autowired
	private PaymentDetailService paymentDetailService;

    @GetMapping
    public ResponseEntity<Response> get() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetailService.get(), new Date()));
    }
    @GetMapping("/view_revenue")
    public ResponseEntity<Response> getOrdersDetail(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetailService.view_revenue(), new Date()));
    }
    @GetMapping("/view_order_detail")
    public ResponseEntity<Response> getOrdersDetail(@RequestParam("pid") Integer pid, @RequestParam("tdate") String tdate) throws ParseException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetailService.getOrdersDetail(pid, tdate), new Date()));
    }
    @GetMapping("/customer_view_order_detail")
    public ResponseEntity<Response> findCustomerOrder(@RequestParam("ddate") String ddate, @RequestParam("slug") String slug) throws ParseException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetailService.findCustomerOrder(ddate, slug), new Date()));
    }

    @GetMapping("/order_status_detail")
    public ResponseEntity<Response> findOrderStatus(@RequestParam("ddate") String ddate, @RequestParam("slug") String slug) throws ParseException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetailService.findOrderStatus(ddate, slug), new Date()));
    }

    @GetMapping("/view_order_status")
    public ResponseEntity<Response> view_order_status(@RequestParam("ddate") String ddate, @RequestParam("id") Integer id) throws ParseException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetailService.view_order_status(ddate, id), new Date()));
    }

    @GetMapping("/updateStatus")
    public ResponseEntity<Response> updateStatus(@RequestParam("order_status") String order_status, @RequestParam("order_no") String order_no) throws ParseException {
        paymentDetailService.updateStatus(order_status, order_no);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(true, new Date()));
    }

	@PostMapping
	public ResponseEntity<Response> save(@RequestBody PaymentDetail paymentDetail) throws Exception{
        return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(paymentDetailService.save(paymentDetail), new Date()));

	}

	@PutMapping
	public ResponseEntity<Response> update(@RequestBody PaymentDetail paymentDetail) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(paymentDetailService.save(paymentDetail), new Date()));
	}

	@DeleteMapping
	public ResponseEntity<Response> delete(@RequestParam("id") int id) {
        paymentDetailService.delete(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(true, new Date()));
	}


}
