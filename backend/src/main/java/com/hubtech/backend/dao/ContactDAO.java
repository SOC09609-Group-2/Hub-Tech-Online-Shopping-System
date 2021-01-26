package com.hubtech.backend.dao;


import com.hubtech.backend.entity.Contact;
import com.hubtech.backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ContactDAO {

	@Autowired
	private ContactRepository contactRepository;
    	public List<Contact> get() {
		return contactRepository.findAll();
	}
	public Contact save(Contact contact) {
		return contactRepository.save(contact);
	}

	public void delete(int id) {
        contactRepository.deleteById(id);
	}
    public Optional<Contact> getById(int id) {
        return contactRepository.findById(id);
    }
}
