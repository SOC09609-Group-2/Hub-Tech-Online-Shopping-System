package com.hubtech.backend.dao;



import com.hubtech.backend.entity.SubCategory;
import com.hubtech.backend.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SubCategoryDAO {

	@Autowired
	private SubCategoryRepository subCategoryRepository;
    public List<SubCategory> get(int mcatID) {
		return subCategoryRepository.findByMcat(mcatID);
	}
	public SubCategory save(SubCategory subCategory) {
		return subCategoryRepository.save(subCategory);
	}

	public void delete(int id) { subCategoryRepository.deleteById(id); }
    public Optional<SubCategory> getById(int id) {
        return subCategoryRepository.findById(id);
    }


}
