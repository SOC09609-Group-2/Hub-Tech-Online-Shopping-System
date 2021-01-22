package com.hubtech.backend.controller;

import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.PaymentDetail;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.MainCategoryService;
import com.hubtech.backend.service.PaymentDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping(path = "/report2")

//@RestController(value = "/users")
public class MonthlySaleReportController {

    @Autowired
    private PaymentDetailService paymentDetailService;

    @GetMapping("/{shopkeeper_product_monthly_sales}")
    public ResponseEntity<Response> getmonthlySale(@RequestParam("sid") Integer sid, @RequestParam("year") String year, @RequestParam("month") String month) throws ParseException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetailService.getyearSale(sid, year, month), new Date()));
    }
}
