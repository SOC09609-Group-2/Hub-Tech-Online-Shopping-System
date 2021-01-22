package com.hubtech.backend.dao;


import com.hubtech.backend.entity.PaymentDetail;
import com.hubtech.backend.model.OrderDetailDto;
import com.hubtech.backend.model.ProductMonthSaleDto;
import com.hubtech.backend.model.ProductYearSaleDto;
import com.hubtech.backend.repository.PaymentDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;
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

    public Collection<OrderDetailDto> getOrdersDetail(int pid, String  tdate) {
        Collection<OrderDetailDto> list = paymentDetailRepository.findOrdersDetail(pid,tdate);
     return list;
   }
   public Collection<ProductYearSaleDto> getyearSale(int pid, String  tdate) {
        Collection<ProductYearSaleDto> list = paymentDetailRepository.findyearSale(pid,tdate);
     return list;
   }
   public Collection<ProductMonthSaleDto> getmonthSale(int pid, String  tdate1, String tdate2) {
        Collection<ProductMonthSaleDto> list = paymentDetailRepository.findmonthSale(pid,tdate1,tdate2);
     return list;
   }


}
