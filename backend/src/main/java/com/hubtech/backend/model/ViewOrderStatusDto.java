package com.hubtech.backend.model;

public interface ViewOrderStatusDto {
    String getOrder_no();
    Integer getQty();
    String getName();
    Float getTotal_price();
    String getOrder_status();
    String getCreated_at();
}
