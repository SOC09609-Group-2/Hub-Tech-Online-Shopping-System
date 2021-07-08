package com.hubtech.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public interface CommentDto {
    Integer getId();
    String getName();
    String getImage_name();
    String getText();
    String getCreated_at();


}
