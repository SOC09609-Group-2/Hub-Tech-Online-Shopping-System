package com.hubtech.backend.dao;



import com.hubtech.backend.entity.SubCategory;
import com.hubtech.backend.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SubCategoryDAO {

	@Autowired
	private SubCategoryRepository subCategoryRepository;
    	public List<SubCategory> get() {
		return subCategoryRepository.findAll();
	}
	public SubCategory save(SubCategory subCategory) {
		return subCategoryRepository.save(subCategory);
	}

	public void delete(int id) { subCategoryRepository.deleteById(id); }

//	public SubCategory reterieve_sc(int id){
//		return subCategoryRepository.findByMain_category_id(id);
//	}

}
