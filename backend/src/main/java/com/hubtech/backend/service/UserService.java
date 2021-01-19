package com.hubtech.backend.service;


import com.hubtech.backend.dao.UserDAO;
import com.hubtech.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
