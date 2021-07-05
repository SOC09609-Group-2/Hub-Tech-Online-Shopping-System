package com.hubtech.backend.repository;


import com.hubtech.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmailAndPassword(String email, String password);

    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET status= :action WHERE slug= :slug" , nativeQuery=true)
    void banUser(@Param("slug") String slug, @Param("action") String action);

    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET name= :name, email= :email, address= :address, image_name= :image  WHERE id= :id" , nativeQuery=true)
    void editProfile(@Param("id") int id, @Param("name") String name
            , @Param("email") String email, @Param("address") String address,
                     @Param("image") String image);
}
