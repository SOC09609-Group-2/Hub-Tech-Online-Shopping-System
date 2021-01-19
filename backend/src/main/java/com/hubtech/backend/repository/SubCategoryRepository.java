package com.hubtech.backend.repository;

import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
//        SubCategory findByMain_category_id(int maincategory_id);


}
