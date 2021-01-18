package com.hubtech.backend.service;

import com.hubtech.backend.dao.MainCategoryDAO;

import com.hubtech.backend.entity.MainCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainCategoryService {

	@Autowired
	private MainCategoryDAO mainCategoryDAO;

	public List<MainCategory> get() {
		return mainCategoryDAO.get();
	}

	public MainCategory save(MainCategory mainCategory) {
		return mainCategoryDAO.save(mainCategory);
	}

	public void delete(int id) {
        mainCategoryDAO.delete(id);
	}
}
