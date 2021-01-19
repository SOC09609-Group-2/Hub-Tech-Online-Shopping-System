package com.hubtech.backend.repository;

import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {


}