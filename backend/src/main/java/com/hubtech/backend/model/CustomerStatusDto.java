package com.hubtech.backend.model;

public interface CustomerStatusDto {
    Integer getId();
    Integer getQty();
    String getShop_name();
    Float getTotal_price();
    String getOrder_status();
    String getCreated_at();
}
