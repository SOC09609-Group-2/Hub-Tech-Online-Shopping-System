package com.hubtech.backend.entity;
import javax.persistence.*;
import java.io.Serializable;
@Entity
@Table(name = "products")
public class Product implements Serializable {
    private static final long serialVersionUID = 1681261145191719508L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String price;
    private int cat_id;
    private int sub_cat_id;
    private int supplier_id;
    private String slug;
    private String context;
    private String image_name;
    private String created_at;
    private String updated_at;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPrice() {
        return price;
    }

    public int getCat_id() {
        return cat_id;
    }

    public int getSub_cat_id() {
        return sub_cat_id;
    }

    public int getSupplier_id() {
        return supplier_id;
    }

    public String getSlug() {
        return slug;
    }

    public String getContext() {
        return context;
    }

    public String getImage_name() {
        return image_name;
    }

    public String getCreated_at() {
        return created_at;
    }

    public String getUpdated_at() {
        return updated_at;
    }
}
