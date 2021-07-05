package com.hubtech.backend.service;

import com.hubtech.backend.dao.ContactDAO;
import com.hubtech.backend.entity.Contact;
import com.hubtech.backend.model.ChatUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactDAO contactDAO;

    public List<Contact> get(int sender_id, int receiver_id) {
        return contactDAO.get(sender_id, receiver_id);
    }

    public Contact save(Contact contact) {
        return contactDAO.save(contact);
    }

    public Collection<ChatUserDto> getSenderList(int uid) {
        return contactDAO.getSenderList(uid);
    }
    public Collection<ChatUserDto> getReceiverList(int uid) {
        return contactDAO.getReceiverList(uid);
    }
}
