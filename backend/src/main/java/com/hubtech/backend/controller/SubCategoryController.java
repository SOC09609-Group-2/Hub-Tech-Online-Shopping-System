package com.hubtech.backend.controller;

import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.SubCategory;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.MainCategoryService;
import com.hubtech.backend.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(path = "/sub_category")

//@RestController(value = "/users")
public class SubCategoryController {

	@Autowired
	private SubCategoryService subCategoryService;

	@GetMapping
	public ResponseEntity<Response> get(@RequestParam("mid") int mid) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(subCategoryService.get(mid), new Date()));
	}
    @GetMapping("/{retrieve_single_sc}")
    public ResponseEntity<Response> getById(@RequestParam("id") int mid) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(subCategoryService.getById(mid), new Date()));
    }

	@PostMapping
	public ResponseEntity<Response> save(@RequestBody SubCategory subCategory) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(subCategoryService.save(subCategory), new Date()));
	}

	@PutMapping
	public ResponseEntity<Response> update(@RequestBody SubCategory subCategory) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(subCategoryService.save(subCategory), new Date()));
	}

	@DeleteMapping
	public ResponseEntity<Response> delete(@RequestParam("id") int id) {
        subCategoryService.delete(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(true, new Date()));
	}

//	@PostMapping("/{reterieve_sc}")
//	public ResponseEntity<Response> retrieveSCbyMC(@RequestBody SubCategory subCategory) {
//		int mc_id = subCategory.getMain_category_id();
//		return ResponseEntity.status(HttpStatus.OK)
//				.body(new Response(subCategoryService.reterieve_sc(mc_id), new Date()));
//	}

}
