package com.hubtech.backend.service;

import com.hubtech.backend.dao.MainCategoryDAO;

import com.hubtech.backend.dao.ProductDAO;
import com.hubtech.backend.entity.MainCategory;
import com.hubtech.backend.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductDAO productDAO;

    public List<Product> get() {
        return productDAO.get();
    }

    public Product save(Product product) {
        return productDAO.save(product);
    }

    public void delete(int id) {
        productDAO.delete(id);
    }

    public List<Product> getBySlug(String slug) {
        return productDAO.getBySlug(slug);
    }
    public List<Product> findByCatAndScat(int cid, int scid) {
        return productDAO.findByCatAndScat(cid, scid);
    }
    public List<Product> findByNameContaining(String name) {
        return productDAO.findByNameContaining(name);
    }
}
