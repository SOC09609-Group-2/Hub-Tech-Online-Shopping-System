package com.hubtech.backend.dao;


import com.hubtech.backend.entity.Faq;
import com.hubtech.backend.entity.Payment;
import com.hubtech.backend.repository.FaqRepository;
import com.hubtech.backend.repository.PaymentRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FaqDAO {

    @Autowired
    private FaqRepository faqRepository;
    public List<Faq> get() {
        return faqRepository.findAll();
    }
    public Faq save(Faq faq) {
        return faqRepository.save(faq);
    }

    public void delete(int id) {
        faqRepository.deleteById(id);
    }
    public List<Faq> findBySlug(String slug) {
        return faqRepository.findBySlug(slug);
    }
}
