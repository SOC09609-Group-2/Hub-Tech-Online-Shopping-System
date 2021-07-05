package com.hubtech.backend.service;

import com.hubtech.backend.dao.PaymentDetailDAO;
import com.hubtech.backend.entity.PaymentDetail;
import com.hubtech.backend.model.*;
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
    public Collection<ProductYearSaleDto> getyearSale(int pid, String tdate) {
        return paymentDetailDAO.getyearSale(pid,tdate);
    }

    public Collection<ProductMonthSaleDto> getyearSale(int pid, String tdate1, String tdate2) {
        return paymentDetailDAO.getmonthSale(pid,tdate1,tdate2);
    }

    public Collection<CustomerOrderDto> findCustomerOrder(String ddate, String slug) {
        return paymentDetailDAO.findCustomerOrder(ddate, slug);
    }

    public Collection<CustomerStatusDto> findOrderStatus(String ddate, String slug) {
        return paymentDetailDAO.findOrderStatus(ddate, slug);
    }

    public Collection<ViewOrderStatusDto> view_order_status(String ddate, Integer id) {
        return paymentDetailDAO.view_order_status(ddate, id);
    }

    public void updateStatus(String order_status, String order_no) {
         paymentDetailDAO.updateStatus(order_status, order_no);
    }

    public Collection<RevenueDto> view_revenue() {
        return paymentDetailDAO.view_revenue();
    }
}
