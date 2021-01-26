package com.hubtech.backend.controller;

import com.hubtech.backend.entity.Contact;
import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.ContactService;
import com.hubtech.backend.service.MainCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(path = "/contacts")

//@RestController(value = "/users")
public class ContactController {

	@Autowired
	private ContactService contactService;

	@GetMapping
	public ResponseEntity<Response> get() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(contactService.get(), new Date()));
	}
	@GetMapping("/{retrieve_single_mc}")
	public ResponseEntity<Response> getById(@RequestParam("id") int id) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(contactService.getById(id), new Date()));
	}

	@PostMapping
	public ResponseEntity<Response> save(@RequestBody Contact contact) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(contactService.save(contact), new Date()));
	}

	@PutMapping
	public ResponseEntity<Response> update(@RequestBody Contact contact) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(contactService.save(contact), new Date()));
	}

	@DeleteMapping
	public ResponseEntity<Response> delete(@RequestParam("id") int id) {
        contactService.delete(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(true, new Date()));
	}

}
