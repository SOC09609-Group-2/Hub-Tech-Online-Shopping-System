package com.hubtech.backend.repository;
import com.hubtech.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findBySlug(String slug);

    @Query(value = "SELECT * FROM products ORDER BY id DESC LIMIT 6" , nativeQuery=true)
    List<Product> findNewArrival();

    @Query(value = "SELECT * FROM products INNER JOIN payment_details on products.id = payment_details.product_id GROUP BY payment_details.product_id ORDER BY SUM(payment_details.total_price) DESC LIMIT 6" , nativeQuery=true)
    List<Product> findBestSeller();

    @Query(value = "SELECT * FROM products WHERE cat_id = :cid AND sub_cat_id = :scid" , nativeQuery=true)
    List<Product> findByCatAndScat(@Param("cid") int cid, @Param("scid") int scid);

//    @Query(value = "SELECT * FROM products WHERE name LIKE %:name%" , nativeQuery=true)
//    List<Product> SearchName(@Param("name") String name);
    List<Product> findByNameContaining(String name);


}
