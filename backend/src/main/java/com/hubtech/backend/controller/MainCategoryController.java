package com.hubtech.backend.controller;

import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.MainCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(path = "/main_category")

//@RestController(value = "/users")
public class MainCategoryController {

	@Autowired
	private MainCategoryService mainCategoryService;

	@GetMapping
	public ResponseEntity<Response> get() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(mainCategoryService.get(), new Date()));
	}

	@PostMapping
	public ResponseEntity<Response> save(@RequestBody MainCategory mainCategory) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(mainCategoryService.save(mainCategory), new Date()));
	}

	@PutMapping
	public ResponseEntity<Response> update(@RequestBody MainCategory mainCategory) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(mainCategoryService.save(mainCategory), new Date()));
	}

	@DeleteMapping
	public ResponseEntity<Response> delete(@RequestParam("id") int id) {
        mainCategoryService.delete(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(true, new Date()));
	}

}
