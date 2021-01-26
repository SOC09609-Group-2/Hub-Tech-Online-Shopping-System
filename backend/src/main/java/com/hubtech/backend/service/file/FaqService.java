package com.hubtech.backend.service;

import com.hubtech.backend.dao.FaqDAO;
import com.hubtech.backend.dao.PaymentDAO;
import com.hubtech.backend.entity.Faq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaqService {

    @Autowired
    private FaqDAO faqDAO;

    public List<Faq> get() {
        return faqDAO.get();
    }

    public Faq save(Faq faq) {
        return faqDAO.save(faq);
    }

    public void delete(int id) {
        faqDAO.delete(id);
    }
}
