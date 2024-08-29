package com.GoodWillCharity_SprinBoot_API.app.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {

	@GetMapping("/Resources/{imageName}")
	public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
	    String projectRootPath = Paths.get("").toAbsolutePath().toString();
	    String path = projectRootPath + File.separator + "Uploads" + File.separator + imageName;

	    File file = new File(path);
	    if (file.exists()) {
	        byte[] imageData = new byte[(int) file.length()];
	        try (FileInputStream fileInputStream = new FileInputStream(file)) {
	            fileInputStream.read(imageData);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageData);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
}
