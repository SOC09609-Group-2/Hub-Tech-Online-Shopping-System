package com.hubtech.backend.controller;
import com.hubtech.backend.model.UploadFileResponse;
import com.hubtech.backend.service.file.FileUploadDownloadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.MalformedURLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;


@RestController
public class FileUploadDownloadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadDownloadController.class);

    @Autowired
    private FileUploadDownloadService fileUploadDownloadService;

    @PostMapping(value = "/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile[] files) {
        Date now = new Date();
        String uniqueNum  = new SimpleDateFormat("yyyyMMddHHmm", Locale.ENGLISH).format(now);
        LinkedList<String> fileNames = new LinkedList<String>();
        for (MultipartFile file: files){
            System.out.println(file.getOriginalFilename());
            String fileName = fileUploadDownloadService.uploadFile(file);
            fileNames.add( uniqueNum + fileName);
        }
        return new UploadFileResponse(fileNames);
    }

    // Displays the list of uploaded files.
    @GetMapping("/getFiles")
    public List<String> getFiles() throws IOException {
        return fileUploadDownloadService.getFiles();
    }

    // Downloads a file using filename.
    @GetMapping("/downloadFile/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) throws MalformedURLException {
        Resource resource = fileUploadDownloadService.loadFileAsResource(fileName);
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }
        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
