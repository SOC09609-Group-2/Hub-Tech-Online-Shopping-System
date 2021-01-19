package com.hubtech.backend.service;

import com.hubtech.backend.dao.PaymentDAO;
import com.hubtech.backend.entity.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentDAO paymentDAO;

    public List<Payment> get() {
        return paymentDAO.get();
    }

    public Payment save(Payment payment) {
        return paymentDAO.save(payment);
    }

    public void delete(int id) {
        paymentDAO.delete(id);
    }
}
