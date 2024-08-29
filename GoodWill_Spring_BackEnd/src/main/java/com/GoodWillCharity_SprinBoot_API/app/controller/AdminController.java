////package com.GoodWillCharity_SprinBoot_API.app.controller;
////
////import com.GoodWillCharity_SprinBoot_API.app.model.Admin;
////import com.GoodWillCharity_SprinBoot_API.app.service.IAdminService;
////import com.GoodWillCharity_SprinBoot_API.app.service.IFileService;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.http.ResponseEntity;
////import org.springframework.web.bind.annotation.*;
////import org.springframework.web.multipart.MultipartFile;
////
////@RestController
////@RequestMapping("/api/admin")
////public class AdminController {
////
////    @Autowired
////    private IAdminService adminService;
////
////    @Autowired
////    private IFileService fileService;
////
////    @PostMapping
////    public ResponseEntity<String> addAdmin(@RequestParam("ImagesFile") MultipartFile imagesFile,
////                                           @ModelAttribute Admin admin) {
////        try {
////            if (!imagesFile.isEmpty()) {
////                String profilePicPath = fileService.saveImage(imagesFile);
////                admin.setProfilePicPath(profilePicPath);
////            }
////            admin.setRole("Admin");
////            adminService.createAdmin(admin);
////            return ResponseEntity.ok("Admin added into DB");
////        } catch (Exception e) {
////            e.printStackTrace();
////            return ResponseEntity.status(404).body("Error while adding data");
////        }
////    }
////
////    @PostMapping("/login")
////    public ResponseEntity<?> loginAdmin(@RequestParam String email, @RequestParam String password) {
////        try {
////            Admin admin = adminService.loginAdmin(email, password);
////            if (admin != null) {
////                String tokenValue = adminService.generateToken(admin);
////                return ResponseEntity.ok(new LoginResponse(admin.getId(), admin.getRole(), "Login Success", tokenValue));
////            } else {
////                return ResponseEntity.badRequest().body("Please enter valid email or password");
////            }
////        } catch (Exception e) {
////            e.printStackTrace();
////            return ResponseEntity.badRequest().body("Error");
////        }
////    }
////
////    private static class LoginResponse {
////        private String id;
////        private String userRole;
////        private String msg;
////        private String token;
////
////        public LoginResponse(String id, String userRole, String msg, String token) {
////            this.id = id;
////            this.userRole = userRole;
////            this.msg = msg;
////            this.token = token;
////        }
////
////        // Getters and Setters
////    }
////}
//
//
//package com.GoodWillCharity_SprinBoot_API.app.controller;
//
//import com.GoodWillCharity_SprinBoot_API.app.model.Admin;
//import com.GoodWillCharity_SprinBoot_API.app.service.IAdminService;
//import com.GoodWillCharity_SprinBoot_API.app.service.IFileService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//@RestController
//@RequestMapping("/api/admin")
//public class AdminController {
//
//    @Autowired
//    private IAdminService adminService;
//
//    @Autowired
//    private IFileService fileService;
//
//    @PostMapping
//    public ResponseEntity<String> addAdmin(@RequestParam("ImagesFile") MultipartFile imagesFile,
//                                           @ModelAttribute Admin admin) {
//        try {
//            if (!imagesFile.isEmpty()) {
//                String profilePicPath = fileService.saveImage(imagesFile);
//                admin.setProfilePicPath(profilePicPath);
//            }
//            admin.setRole("Admin");
//            adminService.createAsync(admin).join();
//            return ResponseEntity.ok("Admin added into DB");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(404).body("Error while adding data");
//        }
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> loginAdmin(@RequestParam String email, @RequestParam String password) {
//        try {
//            Admin admin = adminService.loginAdmin(email, password).join();
//            if (admin != null) {
//                String tokenValue = adminService.generateToken(admin);
//                return ResponseEntity.ok(new LoginResponse(admin.getId(), admin.getRole(), "Login Success", tokenValue));
//            } else {
//                return ResponseEntity.badRequest().body("Please enter valid email or password");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().body("Error");
//        }
//    }
//
//    private static class LoginResponse {
//        private String id;
//        private String userRole;
//        private String msg;
//        private String token;
//
//        public LoginResponse(String id, String userRole, String msg, String token) {
//            this.id = id;
//            this.userRole = userRole;
//            this.msg = msg;
//            this.token = token;
//        }
//
//        // Getters and Setters
//        public String getId() { return id; }
//        public void setId(String id) { this.id = id; }
//        public String getUserRole() { return userRole; }
//        public void setUserRole(String userRole) { this.userRole = userRole; }
//        public String getMsg() { return msg; }
//        public void setMsg(String msg) { this.msg = msg; }
//        public String getToken() { return token; }
//        public void setToken(String token) { this.token = token; }
//    }
//}
