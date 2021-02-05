package com.hubtech.backend.repository;

import com.hubtech.backend.entity.PaymentDetail;
import com.hubtech.backend.entity.User;
import com.hubtech.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Repository
public interface PaymentDetailRepository extends JpaRepository<PaymentDetail, Integer> {

    @Query(value = "SELECT payment_details.id,product_name, SUM(qty) as qty,users.email,payment_details.date FROM payment_details INNER JOIN users ON payment_details.customer_slug = users.slug WHERE payment_details.date = :tdate AND payment_details.supplier_id = :pid GROUP BY payment_details.created_at,payment_details.product_id,payment_details.customer_slug ORDER BY payment_details.created_at DESC" , nativeQuery=true)
    public Collection<OrderDetailDto> findOrdersDetail(@Param("pid") int pid, @Param("tdate") String tdate);

    @Query(value = "SELECT payment_details.id,payment_details.product_name, SUM(total_price) as total_sale, year, products.price, products.image_name,products.slug FROM payment_details INNER JOIN products ON payment_details.product_id = products.id WHERE year = :year AND payment_details.supplier_id = :pid GROUP BY payment_details.product_id ORDER BY total_sale DESC LIMIT 6" , nativeQuery=true)
    public Collection<ProductYearSaleDto> findyearSale(@Param("pid") int pid, @Param("year") String year);

    @Query(value = "SELECT id, product_name, SUM(total_price) as total_sale, year, month FROM payment_details WHERE year = :year AND month = :month AND payment_details.supplier_id = :pid GROUP BY payment_details.product_id ORDER BY total_sale DESC LIMIT 6" , nativeQuery=true)
    public Collection<ProductMonthSaleDto> findmonthSale(@Param("pid") int pid, @Param("year") String year, @Param("month") String month);


    @Query(value = "SELECT payment_details.id,product_name, SUM(qty) as qty, SUM(total_price) as total_price,payment_details.created_at FROM payment_details INNER JOIN users ON payment_details.customer_slug = users.slug WHERE payment_details.date = :ddate AND payment_details.customer_slug = :slug GROUP BY  payment_details.created_at,payment_details.product_id,payment_details.customer_slug ORDER BY payment_details.created_at DESC" , nativeQuery=true)
    public Collection<CustomerOrderDto> findCustomerOrder(@Param("ddate") String ddate, @Param("slug") String slugslug);

    @Query(value = "SELECT payment_details.id, SUM(qty) as qty, users.shop_name, SUM(total_price) as total_price, payment_details.order_status, payment_details.created_at FROM payment_details INNER JOIN users ON payment_details.supplier_id = users.id WHERE payment_details.date = :ddate AND payment_details.customer_slug = :slug GROUP BY payment_details.created_at,payment_details.supplier_id,payment_details.customer_slug ORDER BY payment_details.created_at DESC" , nativeQuery=true)
    public Collection<CustomerStatusDto> findOrderStatus(@Param("ddate") String ddate, @Param("slug") String slugslug);

    @Query(value = "SELECT payment_details.order_no, SUM(qty) as qty, users.name, SUM(total_price) as total_price, payment_details.order_status, payment_details.created_at FROM payment_details INNER JOIN users ON payment_details.supplier_id = users.id WHERE payment_details.date = :ddate AND payment_details.customer_slug = :slug GROUP BY payment_details.created_at,payment_details.supplier_id,payment_details.customer_slug ORDER BY payment_details.created_at DESC" , nativeQuery=true)
    public Collection<ViewOrderStatusDto> view_order_status(@Param("ddate") String ddate, @Param("slug") String slug);

    @Query(value = "SELECT users.name, date, SUM(total_price) as total_sale, year, month FROM payment_details INNER JOIN users ON payment_details.supplier_id = users.id GROUP BY payment_details.supplier_id, payment_details.year, payment_details.month ORDER BY total_sale DESC" , nativeQuery=true)
    public Collection<RevenueDto> view_revenue();

    @Modifying
    @Transactional
    @Query(value = "UPDATE payment_details SET order_status = :order_status WHERE order_no = :order_no" , nativeQuery=true)
    public void updateStatus(@Param("order_status") String order_status, @Param("order_no") String order_no);

}

