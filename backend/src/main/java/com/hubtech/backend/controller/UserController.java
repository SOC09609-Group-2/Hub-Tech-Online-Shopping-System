package com.hubtech.backend.controller;


import com.hubtech.backend.entity.User;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(path = "/user")

public class UserController {

	@Autowired
	private UserService userService;

    @GetMapping
    public ResponseEntity<Response> get() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(userService.get(), new Date()));
    }
    @GetMapping("/banUser")
    public ResponseEntity<Response> banUser(@RequestParam("slug") String slug, @RequestParam("action") String action) {
        userService.banUser(slug, action);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(true, new Date()));
    }

    @GetMapping("/retrieveByID")
    public ResponseEntity<Response> banUser(@RequestParam("id") int id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(userService.findById(id), new Date()));
    }

    @GetMapping("/updateProfile")
    public ResponseEntity<Response> editProfile(@RequestParam("id") int id, @RequestParam("name") String name, @RequestParam("email") String email, @RequestParam("address") String address, @RequestParam("image") String image) {
        userService.editUpdate(id,name,email,address,image);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(true, new Date()));
    }

	@PostMapping
	public ResponseEntity<Response> save(@RequestBody User user) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(userService.save(user), new Date()));
	}

	@PutMapping
	public ResponseEntity<Response> update(@RequestBody User user) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(userService.save(user), new Date()));
	}

	@DeleteMapping
	public ResponseEntity<Response> delete(@RequestParam("id") int id) {
        userService.delete(id);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response(true, new Date()));
	}

	@PostMapping("/{login}")
    public ResponseEntity<Response> login(@RequestBody User user) {
	    String email = user.getEmail();
	    String password = user.getPassword();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(userService.login(email,password), new Date()));
    }

}
