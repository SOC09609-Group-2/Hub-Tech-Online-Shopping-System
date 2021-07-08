package com.hubtech.backend.controller;

import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.PaymentDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.Date;

@RestController
@RequestMapping(path = "/report")

//@RestController(value = "/users")
public class ShopkeeperReportController {

    @Autowired
    private PaymentDetailService paymentDetailService;

    @GetMapping("/{shopkeeper_product_year_sales}")
    public ResponseEntity<Response> getyearSale(@RequestParam("pid") Integer pid, @RequestParam("tdate") String tdate) throws ParseException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetailService.getyearSale(pid, tdate), new Date()));
    }

}
