package com.hubtech.backend.dao;

import com.hubtech.backend.entity.Contact;
import com.hubtech.backend.model.ChatUserDto;
import com.hubtech.backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public class ContactDAO {
    @Autowired
    private ContactRepository contactRepository;

    public List<Contact> get(int sender_id, int receiver_id) {
        return contactRepository.getChatData(sender_id, receiver_id);
    }

    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    public Collection<ChatUserDto> getSenderList(int uid) {
        Collection<ChatUserDto> list = contactRepository.getSenderList(uid);
        return list;
    }

    public Collection<ChatUserDto> getReceiverList(int uid) {
        Collection<ChatUserDto> list = contactRepository.getReceiverList(uid);
        return list;
    }

}
