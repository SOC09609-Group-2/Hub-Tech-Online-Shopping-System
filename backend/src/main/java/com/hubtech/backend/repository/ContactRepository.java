package com.hubtech.backend.repository;

import com.hubtech.backend.entity.Contact;
import com.hubtech.backend.entity.MainCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {



}
