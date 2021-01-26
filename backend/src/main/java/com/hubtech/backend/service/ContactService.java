package com.hubtech.backend.service;

import com.hubtech.backend.dao.ContactDAO;
import com.hubtech.backend.dao.MainCategoryDAO;
import com.hubtech.backend.entity.Contact;
import com.hubtech.backend.entity.MainCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

	@Autowired
	private ContactDAO contactDAO;

	public List<Contact> get() {
		return contactDAO.get();
	}

	public Contact save(Contact contact) {
		return contactDAO.save(contact);
	}

	public void delete(int id) {
        contactDAO.delete(id);
	}

    public Optional<Contact> getById(int id) {
        return contactDAO.getById(id);
    }
}
