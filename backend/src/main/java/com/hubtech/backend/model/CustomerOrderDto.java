package com.hubtech.backend.model;

public interface CustomerOrderDto {
    Integer getId();
    String getProduct_name();
    Integer getQty();;
    Float getTotal_price();
    String getCreated_at();
}
