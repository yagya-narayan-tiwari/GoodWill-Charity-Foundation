package com.GoodWillCharity_SprinBoot_API.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.GoodWillCharity_SprinBoot_API.app.Util.LoginCredentials;
import com.GoodWillCharity_SprinBoot_API.app.Util.LoginResponse;
import com.GoodWillCharity_SprinBoot_API.app.model.Donor;
import com.GoodWillCharity_SprinBoot_API.app.model.Ngo;
import com.GoodWillCharity_SprinBoot_API.app.service.IDonorService;
import com.GoodWillCharity_SprinBoot_API.app.service.IFileService;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.DonorServiceImpl;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.FileServiceImpl;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.FileServiceImpl.Tuple;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donor")
@CrossOrigin(origins = "http://localhost:5173")
public class DonorController {

    //@Autowired
    //private DonorServiceImpl donorService;
    @Autowired
    private IDonorService donorService;
    
    @Autowired
    private IFileService fileService;

    @GetMapping
   // @Secured({"ROLE_ADMIN"})
    public ResponseEntity<List<Donor>> getAll() {
        return ResponseEntity.ok(donorService.getAllDonors());
    }

    @GetMapping("/{id}")
    //@Secured({"ROLE_ADMIN", "ROLE_USER"})
    public ResponseEntity<Donor> getById(@PathVariable String id) {
        Optional<Donor> donor = donorService.getDonorById(id);
        if (donor.isPresent()) {
            return ResponseEntity.ok(donor.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> postDonor(
            @ModelAttribute Donor donor
            //@RequestParam("imagesFile") MultipartFile imagesFile
            ) {
    	MultipartFile imagesFile = donor.getImagesFile();

        if (imagesFile != null && !imagesFile.isEmpty()) {
            // Save the image file and get the path
            //String profilePicPath = fileService.saveImageSpring(imagesFile);
            Tuple<Integer, String> profilePicPath = fileService.saveImage(imagesFile);
            
            if (profilePicPath != null) {
                donor.setProfilePicPath(profilePicPath.second);
            }
        }
        
        donor.setRole("User");

        try {
            donorService.createDonor(donor);
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Bad Request: " + e.getMessage());
        }

        return ResponseEntity.ok("Donor Added Into DB");
    }
//    public ResponseEntity<Donor> create(@ModelAttribute Donor donor) {
//        Donor createdDonor = donorService.createDonor(donor);
//        return ResponseEntity.ok(createdDonor);
//    }

//    @PutMapping("/{id}")
//    //@Secured({"ROLE_ADMIN", "ROLE_USER"})
//    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute Donor donor) {
//    	MultipartFile imagesFile = donor.getImagesFile();
//    	if (imagesFile != null)
//    	{
//    	    var fileResult = fileService.saveImage(imagesFile);
//    	    if (fileResult.first == 1)
//    	    {
//    	        donor.setProfilePicPath(fileResult.second);
//    	    }
//    	    else
//    	    {
//    	        return ResponseEntity.badRequest().body("Invalid credentials");
//    	    }
//    	}
//    	Donor updatedDonor = donorService.updateDonor(id, donor);
//        return ResponseEntity.ok(updatedDonor);
//    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute Donor donor) {
        MultipartFile imagesFile = donor.getImagesFile();
        if (imagesFile != null) {
            var fileResult = fileService.saveImage(imagesFile);
            if (fileResult.first == 1) {
                donor.setProfilePicPath(fileResult.second);
            } else {
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
        } else {
            // If no new image is uploaded, keep the existing profile pic path
            Optional<Donor> existingDonor = donorService.getDonorById(id);
            donor.setProfilePicPath(existingDonor.get().getProfilePicPath());
        }
        Donor updatedDonor = donorService.updateDonor(id, donor);
        return ResponseEntity.ok(updatedDonor);
    }

    @DeleteMapping("/{id}")
    //@Secured({"ROLE_ADMIN", "ROLE_USER"})
    public ResponseEntity<String> delete(@PathVariable String id) {
        
        Optional<Donor> donor = donorService.getDonorById(id);
        if (!donor.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        donorService.deleteDonor(id);
        if (donor.get().getProfilePicPath() != null) {
            String imgStatus = fileService.deleteImage(donor.get().getProfilePicPath());
            return ResponseEntity.ok("Delete success, " + imgStatus);
        }
        return ResponseEntity.ok("Delete success");
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginCredentials loginCredentials) {
    	
    	System.out.println("inside login");
    	
    	String email = loginCredentials.getEmail();
    	String password = loginCredentials.getPassword();
    	System.out.println("email is "+email+" password is"+password);

        Optional<Donor> donor = donorService.loginDonor(email, password);
        if (donor.isPresent()) {
            String token = donorService.generateToken(donor.get());
            return ResponseEntity.ok(new LoginResponse(donor.get().getId(), donor.get().getRole(), "Login Success", token));
        
        	//Donor token = donor.get();
            //return ResponseEntity.ok(donor);
        }
        return ResponseEntity.badRequest().body("Invalid credentials");
    }
}

