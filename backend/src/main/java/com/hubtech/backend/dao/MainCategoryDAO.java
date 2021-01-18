package com.hubtech.backend.dao;


import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.repository.MainCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MainCategoryDAO {

	@Autowired
	private MainCategoryRepository mainCategoryRepository;
    	public List<MainCategory> get() {
		return mainCategoryRepository.findAll();
	}
	public MainCategory save(MainCategory mainCategory) {
		return mainCategoryRepository.save(mainCategory);
	}

	public void delete(int id) {
        mainCategoryRepository.deleteById(id);
	}
}
