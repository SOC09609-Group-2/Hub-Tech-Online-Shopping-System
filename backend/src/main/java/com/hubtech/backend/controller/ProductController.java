package com.hubtech.backend.controller;

import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.Product;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.MainCategoryService;
import com.hubtech.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(path = "/product")

//@RestController(value = "/users")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping
	public ResponseEntity<Response> get() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(productService.get(), new Date()));
	}
    @GetMapping("/{getBySlug}")
    public ResponseEntity<Response> getBySlug(@RequestParam("slug") String slug) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(productService.getBySlug(slug), new Date()));
    }

	@PostMapping
	public ResponseEntity<Response> save(@RequestBody Product product) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(productService.save(product), new Date()));
	}

	@PutMapping
	public ResponseEntity<Response> update(@RequestBody Product product) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(productService.save(product), new Date()));
	}

	@DeleteMapping
	public ResponseEntity<Response> delete(@RequestParam("id") int id) {
		productService.delete(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(true, new Date()));
	}

}
