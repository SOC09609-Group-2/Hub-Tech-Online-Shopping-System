package com.hubtech.backend.dao;


import com.hubtech.backend.entity.Product;
import com.hubtech.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductDAO {
    @Autowired
    private ProductRepository productRepository;
    public List<Product> get() {
        return productRepository.findAll();
    }
    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void delete(int id) {
        productRepository.deleteById(id);
    }

    public List<Product> getBySlug(String slug) {
        return productRepository.findBySlug(slug);
    }
    public List<Product> findByCatAndScat(int cid, int scid) {
        return productRepository.findByCatAndScat(cid, scid);
    }
   public List<Product> findByNameContaining(String name) {
        return productRepository.findByNameContaining(name);
    }

    public List<Product> orderByDate() {
        return productRepository.findNewArrival();
    }
    public List<Product> bestSeller() {
        return productRepository.findBestSeller();
    }
}
