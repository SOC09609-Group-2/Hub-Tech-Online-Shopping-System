package com.hubtech.backend.dao;



import com.hubtech.backend.entity.User;
import com.hubtech.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDAO {

	@Autowired
	private UserRepository userRepository;
	public List<User> get() {
		return userRepository.findAll();
	}
	public User save(User user) {
		return userRepository.save(user);
	}
    public void delete(int id) {
        userRepository.deleteById(id);
    }
    public User login(String email, String password){
        return userRepository.findByEmailAndPassword(email,password);
    }
}
