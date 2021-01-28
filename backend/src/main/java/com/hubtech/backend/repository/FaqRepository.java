package com.hubtech.backend.repository;

import com.hubtech.backend.entity.Faq;
import com.hubtech.backend.entity.MainCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FaqRepository extends JpaRepository<Faq, Integer> {



}
