package com.GoodWillCharity_SprinBoot_API.app.controller;

import com.GoodWillCharity_SprinBoot_API.app.model.Charity;

import com.GoodWillCharity_SprinBoot_API.app.service.ICharityService;
import com.GoodWillCharity_SprinBoot_API.app.service.IFileService;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.CharityServiceImpl;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.FileServiceImpl;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.FileServiceImpl.Tuple;
//import com.GoodWillCharity_SpringBoot_API.app.Util.Constant;


//import com.GoodWillCharity_SprinBoot_API.app.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
//import  java.util.List;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/charity")
@CrossOrigin(origins = "http://localhost:5173")
public class CharityController {

    @Autowired
    private ICharityService charityService;

    @Autowired
    private IFileService fileService;

    @GetMapping
    public ResponseEntity<?> getAllCharities() {
        try {
//            List<Charity> charity = charityService.getAllCharities();
        List<Charity> charities =  charityService.getAllCharities();
        	
            if (charities == null) {
                return ResponseEntity.status(404).body("Data Not Found");
            }
            return ResponseEntity.ok(charities);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("You are not authorized to access this resource.");//Constant.BAD_REQUEST_MSG);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCharityById(@PathVariable String id) {
        try {
            Optional<Charity> charity = charityService.getCharityById(id);
            if (!charity.isPresent()) {
                return ResponseEntity.status(404).body("No Charity Found With id = " + id);
            }
            return ResponseEntity.ok(charity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Something went Wrong");//Constant.BAD_REQUEST_MSG);
        }
    }

    @PostMapping
    public ResponseEntity<?> addCharity(
                                        @ModelAttribute Charity charity) {
        //String userRole = getUserRole();
        //if ("Ngo".equals(userRole)) {
            if (charity.getImagesFile()!=null) {
                Tuple<Integer, String> profilePicPath = fileService.saveImage(charity.getImagesFile());
                charity.setProfilePicPath(profilePicPath.second);
            }
            try {
                charityService.createCharity(charity);
                return ResponseEntity.ok("Charity Added Into DB");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("Something went Wrong");//Constant.BAD_REQUEST_MSG);
            }
        //}
        //return ResponseEntity.status(401).body("You are not authorized to access this resource.");//Constant.UNAUTHORIZED_MSG);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCharity(@PathVariable String id, 
                                           @ModelAttribute Charity charity) {
        charity.setId(id);
//        String userId = getUserId();
//        String userRole = getUserRole();

        Optional<Charity> rs = charityService.getCharityById(id);
        if (!rs.isPresent()) {
            return ResponseEntity.status(404).body("Something went Wrong");//Constant.BAD_REQUEST_MSG);
        }
         MultipartFile imagesFile = charity.getImagesFile();
        //if (userId.equals(rs.get().getNgoId()) && "Ngo".equals(userRole)) {
//            if (imagesFile!=null) {
//                Tuple<Integer, String> profilePicPath = fileService.saveImage(imagesFile);
//                charity.setProfilePicPath(profilePicPath.second);
//            }
	         if (charity.getImagesFile() != null) {
	             Tuple<Integer, String> filePath = fileService.saveImage(charity.getImagesFile());
	             if (filePath != null) {
	                 charity.setProfilePicPath(filePath.second);
	             } else {
	                 return ResponseEntity.badRequest().body("Failed to save image");
	             }
	         }
            try {
                charityService.updateCharity(id, charity);
                return ResponseEntity.ok("Update success");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("Something went Wrong");//Constant.BAD_REQUEST_MSG);
            }
        //}
        //return ResponseEntity.status(401).body("You are not authorized to access this resource.");//Constant.UNAUTHORIZED_MSG);
    }
    
    @GetMapping("/charity_by_ngo/{id}")
    public ResponseEntity<?> getByNgoId(@PathVariable String id) {
        List<Charity> charity = null;
        try {
            charity = charityService.getByNgoId(id);
            return ResponseEntity.ok(charity);
        } catch (Exception e) {
            e.printStackTrace();
            return (ResponseEntity<?>) ResponseEntity.badRequest();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCharity(@PathVariable String id) {
        try {
            Optional<Charity> charity = charityService.getCharityById(id);
            if (!charity.isPresent()) {
                return ResponseEntity.status(404).body("No Charity Found With id = " + id);
            }
//            String userId = getUserId();
//            String userRole = getUserRole();

            //if (userId.equals(charity.get().getNgoId()) && "Ngo".equals(userRole)) {
                charityService.deleteCharity(id);
                String imgStatus = null;
                if (charity.get().getProfilePicPath() != null) {
                    imgStatus = fileService.deleteImage(charity.get().getProfilePicPath());
                }
                return ResponseEntity.ok(new DeletionResponse("Delete success", imgStatus));
//            }
//            return ResponseEntity.status(401).body("You are not authorized to access this resource.");//Constant.UNAUTHORIZED_MSG);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Something went Wrong");//Constant.BAD_REQUEST_MSG);
        }
    }

//    private String getUserId() {
//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        return userDetails.getUsername();  // Assuming the username is the userId
//    }
//
//    private String getUserRole() {
//        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();
//    }

    private static class DeletionResponse {
        private String msg;
        private String imgStatus;

        public DeletionResponse(String msg, String imgStatus) {
            this.msg = msg;
            this.imgStatus = imgStatus;
        }

		public String getMsg() {
			return msg;
		}

		public void setMsg(String msg) {
			this.msg = msg;
		}

		public String getImgStatus() {
			return imgStatus;
		}

		public void setImgStatus(String imgStatus) {
			this.imgStatus = imgStatus;
		}

        
        // Getters and Setters
    }
}
