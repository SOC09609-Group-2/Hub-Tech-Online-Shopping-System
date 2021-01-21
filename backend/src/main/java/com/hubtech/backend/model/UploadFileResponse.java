package com.hubtech.backend.model;

import java.util.LinkedList;
import java.util.List;

public class UploadFileResponse {
    // You may add other file properties like size, file type, etc.
    LinkedList<String> fileName = new LinkedList<String>();
    public UploadFileResponse(LinkedList<String> fileName) {
        this.fileName = fileName;
    }
    public LinkedList<String> getFileName() {
        return fileName;
    }

    public void setFileName(LinkedList<String> fileName) {
        this.fileName = fileName;
    }
}
