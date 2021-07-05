package com.hubtech.backend.dao;



import com.hubtech.backend.entity.User;
import com.hubtech.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
    public void banUser(String slug, String action) {
         userRepository.banUser(slug, action);
    }
    public void editProfile(int id, String name, String email, String address, String image) {
        userRepository.editProfile(id, name, email, address, image);
    }
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }
}
