package com.hubtech.backend.controller;


import com.hubtech.backend.entity.User;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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
	    String password = getSHA512(user.getPassword());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(userService.login(email,password), new Date()));
    }


    public static String getSHA512(String input){
        String toReturn = null;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-512");
            digest.reset();
            digest.update(input.getBytes("utf8"));
            toReturn = String.format("%0128x", new BigInteger(1, digest.digest()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return toReturn;
    }


}
