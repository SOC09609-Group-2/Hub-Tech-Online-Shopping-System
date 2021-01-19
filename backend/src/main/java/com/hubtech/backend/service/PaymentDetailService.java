package com.hubtech.backend.service;

import com.hubtech.backend.dao.MainCategoryDAO;
import com.hubtech.backend.dao.PaymentDetailDAO;
import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.PaymentDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentDetailService {

	@Autowired
	private PaymentDetailDAO paymentDetailDAO;

	public List<PaymentDetail> get() {
		return paymentDetailDAO.get();
	}

	public PaymentDetail save(PaymentDetail paymentDetail) {
		return paymentDetailDAO.save(paymentDetail);
	}

	public void delete(int id) {
        paymentDetailDAO.delete(id);
	}
}
