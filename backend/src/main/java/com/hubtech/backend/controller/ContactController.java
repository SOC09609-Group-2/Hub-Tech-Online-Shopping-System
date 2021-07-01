package com.hubtech.backend.controller;


import com.hubtech.backend.entity.Contact;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(path = "/contact")
@Controller
public class ContactController {

    @Autowired
    private ContactService contactService;
    @GetMapping
    public ResponseEntity<Response> getChatData(@RequestParam("sender_id") int sender_id, @RequestParam("receiver_id") int receiver_id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(contactService.get(sender_id, receiver_id), new Date()));
    }

    @PostMapping
    public ResponseEntity<Response> save(@RequestBody Contact contact) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(contactService.save(contact), new Date()));
    }
    @GetMapping("/getUserList")
    public ResponseEntity<Response> view_order_status(@RequestParam("sender_id") int sender_id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(contactService.getUserList(sender_id), new Date()));
    }
//    @SubscribeMapping("/contact/get")
//    public ResponseEntity<Response> get() {
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(new Response(contactService.get(), new Date()));
//    }
//    @SubscribeMapping("/contact/getUserList")
//    public Collection<ChatUserDto> getUserList() {
//        return contactService.getUserList(3);
//    }
//
//    @MessageMapping("/contact/create")
//    @SendTo("/topic/contact/create")
//    public ResponseEntity<Response> save(@RequestBody Contact contact) {
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(new Response(contactService.save(contact), new Date()));
//    }
}
