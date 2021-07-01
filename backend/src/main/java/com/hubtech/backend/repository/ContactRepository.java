package com.hubtech.backend.repository;

import com.hubtech.backend.entity.Contact;
import com.hubtech.backend.model.ChatUserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Collection;
import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

    @Query(value = "SELECT DISTINCT contacts.receiver_id as id, users.name, users.role, users.image_name FROM `contacts`  LEFT  JOIN users ON contacts.receiver_id = users.id WHERE sender_id = :sender_id" , nativeQuery=true)
    public Collection<ChatUserDto> getUserList(@Param("sender_id") int sender_id );

    @Query(value = "SELECT * FROM contacts WHERE sender_id = :sender_id AND receiver_id = :receiver_id  OR  sender_id = :receiver_id AND receiver_id = :sender_id" , nativeQuery=true)
    public List<Contact> getChatData(@Param("sender_id") int sender_id, @Param("receiver_id") int receiver_id);
}
