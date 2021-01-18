package com.hubtech.backend.entity;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "sub_categories")
public class SubCategory implements Serializable {
    private static final long serialVersionUID = 1681261145191719508L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int maincategoryid;
    private String slug;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public int getMaincategoryid() {
        return maincategoryid;
    }

    public void setMaincategoryid(int maincategoryid) { this.maincategoryid = maincategoryid; }




}
