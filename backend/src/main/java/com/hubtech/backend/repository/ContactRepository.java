package com.hubtech.backend.repository;

import com.hubtech.backend.entity.Contact;
import com.hubtech.backend.model.ChatUserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Collection;
import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

    @Query(value = "SELECT users.id, users.name, users.role, users.image_name FROM users INNER JOIN contacts ON users.id = contacts.sender_id WHERE contacts.sender_id != :uid AND contacts.receiver_id = :uid GROUP BY contacts.sender_id ORDER BY contacts.created_at DESC" , nativeQuery=true)
    public Collection<ChatUserDto> getSenderList(@Param("uid") int uid );

    @Query(value = "SELECT users.id, users.name, users.role, users.image_name FROM users INNER JOIN contacts ON users.id = contacts.receiver_id WHERE contacts.sender_id = :uid AND contacts.receiver_id != :uid GROUP BY contacts.receiver_id ORDER BY contacts.created_at DESC" , nativeQuery=true)
    public Collection<ChatUserDto> getReceiverList(@Param("uid") int uid );

    @Query(value = "SELECT * FROM contacts WHERE sender_id = :sender_id AND receiver_id = :receiver_id  OR  sender_id = :receiver_id AND receiver_id = :sender_id" , nativeQuery=true)
    public List<Contact> getChatData(@Param("sender_id") int sender_id, @Param("receiver_id") int receiver_id);
}
