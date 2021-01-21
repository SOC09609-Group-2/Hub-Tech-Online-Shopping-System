package com.hubtech.backend.service.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class FileUploadDownloadService {

    @Autowired
    private Environment env;

    public String uploadFile(MultipartFile file) {
        Date now = new Date();
        String uniqueNum  = new SimpleDateFormat("yyyyMMddHHmm", Locale.ENGLISH).format(now);
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String newFilename = null;
        try {
            Path fileStorageLocation = Paths.get(env.getProperty("file.upload-dir"))
                    .toAbsolutePath().normalize();
            newFilename = uniqueNum+fileName;
            Path targetLocation = fileStorageLocation.resolve(newFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception ex) {
            System.out.println("Exception:" + ex);
        }
        return newFilename;
    }

    public List<String> getFiles() throws IOException {

        return Files.walk(Paths.get(env.getProperty("file.upload-dir")))
                .filter(Files::isRegularFile)
                .map(file -> file.getFileName().toString())
                .collect(Collectors.toList());
    }

    public Resource loadFileAsResource(String fileName) throws MalformedURLException {
        Path fileStorageLocation = Paths.get(env.getProperty("file.upload-dir"))
                .toAbsolutePath().normalize();
        Path filePath = fileStorageLocation.resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists()) {
            return resource;
        }
        return null;
    }
}
