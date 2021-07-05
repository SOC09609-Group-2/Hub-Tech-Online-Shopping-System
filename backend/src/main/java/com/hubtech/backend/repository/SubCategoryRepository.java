package com.hubtech.backend.repository;

import com.hubtech.backend.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
    List<SubCategory> findByMcat(int main_category_id);
}
