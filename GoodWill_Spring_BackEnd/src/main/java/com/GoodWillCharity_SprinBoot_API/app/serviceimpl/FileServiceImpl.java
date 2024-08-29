


package com.GoodWillCharity_SprinBoot_API.app.serviceimpl;

import org.springframework.beans.factory.annotation.Value;
//import com.GoodWillCharity_SpringBoot_API.app.service.IFileService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.GoodWillCharity_SprinBoot_API.app.service.IFileService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.UUID;

@Service
public class FileServiceImpl implements IFileService {

	
	
//	@Value("${file.upload-dir}")
//    private String uploadDir;
    private static final String UPLOAD_DIR1 = "Uploads/";

    @Override
    public String saveImageSpring(MultipartFile file) {
    	 if (file.isEmpty()) {
             return null;
         }
         
         try {
             // Create directories if they don't exist
             Path path = Paths.get(UPLOAD_DIR1);
             if (!Files.exists(path)) {
                 Files.createDirectories(path);
             }

             // Save the file
             Path filePath = Paths.get(UPLOAD_DIR, file.getOriginalFilename());
             file.transferTo(filePath.toFile());

             // Return the file path or URL as needed
             return filePath.toString();
         } catch (IOException e) {
             e.printStackTrace();
             return null;
         }
     }
    private static final String UPLOAD_DIR = "D:/cdac/dot net/work/Final Project/GoodWillCharity_SprinBoot_API/GoodWillCharity_SprinBoot_API/Uploads";

    @Override
    public Tuple<Integer, String> saveImage(MultipartFile imageFile) {
        try {
            // Get the content path
//            String contentPath = new ClassPathResource("").getFile().getAbsolutePath();
//            String path = contentPath + File.separator + "Uploads";
        	String projectRootPath = Paths.get("").toAbsolutePath().toString();
            String path = projectRootPath + File.separator + "Uploads";
            // Create the directory if it doesn't exist
            File directory = new File(path);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Check the file extension
            String ext = StringUtils.getFilenameExtension(imageFile.getOriginalFilename()).toLowerCase();
            String[] allowedExtensions = {"jpg", "png", "jpeg"};
            if (!Arrays.asList(allowedExtensions).contains(ext)) {
                return new Tuple<>(0, "Only " + String.join(", ", allowedExtensions) + " extensions are allowed.");
            }

            // Create a unique file name
            String uniqueString = UUID.randomUUID().toString();
            String newFileName = uniqueString + "." + ext;
            String fileWithPath = path + File.separator + newFileName;

            // Save the file
            try (FileOutputStream stream = new FileOutputStream(new File(fileWithPath))) {
                stream.write(imageFile.getBytes());
            }

            return new Tuple<>(1, newFileName);
        } catch (IOException e) {
            e.printStackTrace();
            return new Tuple<>(0, "An error occurred while saving the image.");
        }
    }

    @Override
    public String deleteImage(String imageFileName) {
        try {
            String contentPath = new ClassPathResource("").getFile().getAbsolutePath();
            String path = contentPath + File.separator + "Uploads" + File.separator + imageFileName;

            File file = new File(path);
            if (file.exists()) {
                file.delete();
                return "Image is deleted.";
            } else {
                return "No image found.";
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "An error occurred while deleting the image.";
        }
    }

    // Custom Tuple class as Java doesn't have a native one.
    public static class Tuple<X, Y> {
        public final X first;
        public final Y second;

        public Tuple(X first, Y second) {
            this.first = first;
            this.second = second;
        }
    }
}
