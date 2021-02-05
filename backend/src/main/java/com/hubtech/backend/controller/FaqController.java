package com.hubtech.backend.controller;
import com.hubtech.backend.entity.Faq;
import com.hubtech.backend.model.Response;
import com.hubtech.backend.service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(path = "/faq")

//@RestController(value = "/users")
public class FaqController {

    @Autowired
    private FaqService faqService;

    @GetMapping
    public ResponseEntity<Response> get() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(faqService.get(), new Date()));
    }
    @GetMapping("/edit")
    public ResponseEntity<Response> findByS(@RequestParam("slug") String slug) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(faqService.findBySlug(slug), new Date()));
    }


    @PostMapping
    public ResponseEntity<Response> save(@RequestBody Faq faq) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(faqService.save(faq), new Date()));
    }

    @PutMapping
    public ResponseEntity<Response> update(@RequestBody Faq faq) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(faqService.save(faq), new Date()));
    }

    @DeleteMapping
    public ResponseEntity<Response> delete(@RequestParam("id") int id) {
        faqService.delete(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(true, new Date()));
    }

}
