package com.hubtech.backend.service;

import com.hubtech.backend.dao.PaymentDetailDAO;
import com.hubtech.backend.entity.PaymentDetail;
import com.hubtech.backend.model.OrderDetailDto;
import com.hubtech.backend.model.ProductMonthSaleDto;
import com.hubtech.backend.model.ProductYearSaleDto;
import com.hubtech.backend.repository.PaymentDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class PaymentDetailService {

	@Autowired
	private PaymentDetailDAO paymentDetailDAO;
    private PaymentDetailRepository paymentDetailRepository;
	public List<PaymentDetail> get() {
		return paymentDetailDAO.get();
	}

	public PaymentDetail save(PaymentDetail paymentDetail) {
		return paymentDetailDAO.save(paymentDetail);
	}

	public void delete(int id) {
        paymentDetailDAO.delete(id);
	}

    public Collection<OrderDetailDto> getOrdersDetail(int pid, String tdate) {
	    String formatdate = tdate.replace("'", "");
        return paymentDetailDAO.getOrdersDetail(pid,tdate);
    }
    public Collection<ProductYearSaleDto> getyearSale(int pid, String  tdate) {
        return paymentDetailDAO.getyearSale(pid,tdate);
    }

    public Collection<ProductMonthSaleDto> getyearSale(int pid, String  tdate1, String tdate2) {
        return paymentDetailDAO.getmonthSale(pid,tdate1,tdate2);
    }
}
