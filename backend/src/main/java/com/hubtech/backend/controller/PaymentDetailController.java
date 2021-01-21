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
    @GetMapping("/{view_order_detail}")
    public ResponseEntity<Response> getOrdersDetail(@RequestParam("pid") Integer pid, @RequestParam("tdate") String tdate) throws ParseException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetailService.getOrdersDetail(pid, tdate), new Date()));
    }
//    @GetMapping("/{shopkeeper_product_year_sales}")
//    public ResponseEntity<Response> getyearSale(@RequestParam("pid") Integer pid, @RequestParam("tdate") String tdate) throws ParseException {
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(new Response(paymentDetailService.getyearSale(pid, tdate), new Date()));
//    }

	@PostMapping
	public ResponseEntity<Response> save(@RequestBody PaymentDetail paymentDetail) {
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
