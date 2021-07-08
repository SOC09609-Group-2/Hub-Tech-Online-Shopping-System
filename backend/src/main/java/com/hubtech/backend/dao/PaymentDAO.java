package com.hubtech.backend.dao;


import com.hubtech.backend.entity.Payment;
import com.hubtech.backend.repository.PaymentRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PaymentDAO {

    @Autowired
    private PaymentRespository paymentRespository;
    public List<Payment> get() {
        return paymentRespository.findAll();
    }
    public Payment save(Payment payment) {
        return paymentRespository.save(payment);
    }

    public void delete(int id) {
        paymentRespository.deleteById(id);
    }
}
