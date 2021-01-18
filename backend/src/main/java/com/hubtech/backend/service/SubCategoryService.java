package com.hubtech.backend.service;

import com.hubtech.backend.dao.MainCategoryDAO;
import com.hubtech.backend.dao.SubCategoryDAO;
import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.SubCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryService {

	@Autowired
	private SubCategoryDAO subCategoryDAO;

	public List<SubCategory> get() {
		return subCategoryDAO.get();
	}

	public SubCategory save(SubCategory subCategory) {
		return subCategoryDAO.save(subCategory);
	}

	public void delete(int id) {
        subCategoryDAO.delete(id);
	}
}
