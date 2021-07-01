package com.hubtech.backend.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hubtech.backend.entity.PaymentDetail;
import com.hubtech.backend.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/mail")
public class MailController {
    @Autowired
    SpringTemplateEngine templateEngine;

    @Autowired
    private JavaMailSender sender;

    @PostMapping
    public ResponseEntity<Response> save(@RequestParam("oid") String oid, @RequestParam("date") String date, @RequestParam("name") String name, @RequestParam("email") String email, @RequestParam("address") String address, @RequestParam("totalPrice") Float totalPrice, @RequestBody ArrayList<Object> paymentDetail) throws Exception{
        System.out.println(email);

        mailSending(paymentDetail, oid, date, name, email, address, totalPrice);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response(paymentDetail, new Date()));
    }

    private Object mailSending(ArrayList<Object> paymentDetail, String oid, String date, String name, String email, String address, Float totaolPrice) throws MessagingException, IOException {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());
        System.out.println(paymentDetail.size());
        Map<String, Object> paymentInfos = new HashMap<>();
        paymentInfos.put("ProjectInfo",paymentDetail);
        paymentInfos.put("count",paymentDetail.size());
        paymentInfos.put("oid",oid);
        paymentInfos.put("date",date);
        paymentInfos.put("name",name);
        paymentInfos.put("email",email);
        paymentInfos.put("address",address);
        paymentInfos.put("totalPrice",totaolPrice);
//        for (int counter = 0; counter < paymentDetail.size(); counter++) {
//            paymentInfos.put("ss"+counter,paymentDetail.get(counter));
//        }
        System.out.println(paymentInfos);
        Context context = new Context();
        context.setVariables(paymentInfos);
        String html = templateEngine.process("email-template", context);
        try {
            helper.setTo(email);
            helper.setText(html,true);
            helper.setSubject("Invoice for your billing");
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }
        sender.send(message);

        return paymentDetail;
    }
}
