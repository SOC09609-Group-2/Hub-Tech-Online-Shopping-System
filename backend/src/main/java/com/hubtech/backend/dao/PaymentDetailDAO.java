package com.hubtech.backend.dao;


import com.hubtech.backend.entity.PaymentDetail;
import com.hubtech.backend.repository.PaymentDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PaymentDetailDAO {

	@Autowired
	private PaymentDetailRepository paymentDetailRepository;
    	public List<PaymentDetail> get() {
		return paymentDetailRepository.findAll();
	}
	public PaymentDetail save(PaymentDetail paymentDetail) { return paymentDetailRepository.save(paymentDetail);
	}

	public void delete(int id) {
        paymentDetailRepository.deleteById(id);
	}
}
