package com.hubtech.backend.repository;

import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PaymentDetailRepository extends JpaRepository<PaymentDetail, Integer> {


}
