package com.hubtech.backend.service;

import com.hubtech.backend.dao.MainCategoryDAO;
import com.hubtech.backend.dao.SubCategoryDAO;
import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.SubCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubCategoryService {

	@Autowired
	private SubCategoryDAO subCategoryDAO;

	public List<SubCategory> get(int mcatID) {
		return subCategoryDAO.get(mcatID);
	}

	public SubCategory save(SubCategory subCategory) {
		return subCategoryDAO.save(subCategory);
	}

	public void delete(int id) {
        subCategoryDAO.delete(id);
	}

    public Optional<SubCategory> getById(int id) {
        return subCategoryDAO.getById(id);
    }
}
