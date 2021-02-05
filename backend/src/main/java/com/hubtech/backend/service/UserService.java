package com.hubtech.backend.service;


import com.hubtech.backend.dao.UserDAO;
import com.hubtech.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

	@Autowired
	private UserDAO userDAO;

	public List<User> get() {
		return userDAO.get();
	}

	public User save(User user) {
		return userDAO.save(user);
	}

	public void delete(int id) {
	    userDAO.delete(id);
	}

	public  User login(String email, String password) {
        return userDAO.login(email,password);
    }
    public void banUser(String slug, String action) {
        userDAO.banUser(slug, action);
    }
    public void editUpdate(int id, String name, String email, String address, String image) {
        userDAO.editProfile(id, name, email, address, image);
    }

    public Optional<User> findById(int id) {
        return userDAO.findById(id);
    }
}
