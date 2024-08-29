////
////package com.GoodWillCharity_SprinBoot_API.app.serviceimpl;
////
////
////import com.GoodWillCharity_SprinBoot_API.app.model.Admin;
////import com.GoodWillCharity_SprinBoot_API.app.service.IAdminService;
////
////import io.jsonwebtoken.Claims;
////import io.jsonwebtoken.Jwts;
////import io.jsonwebtoken.SignatureAlgorithm;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.stereotype.Service;
////
////import java.util.Date;
////import java.util.UUID;
////import java.util.concurrent.CompletableFuture;
////
////@Service
////public class AdminServiceImpl implements IAdminService {
////
////    @Autowired
////    private AdminRepository adminRepository;
////
////    @Autowired
////    private JwtProperties jwtProperties;
////
////    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
////
////    @Override
////    public CompletableFuture<Void> createAsync(Admin admin) {
////        return CompletableFuture.runAsync(() -> {
////            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
////            adminRepository.save(admin);
////        });
////    }
////
////    @Override
////    public CompletableFuture<Admin> loginAdmin(String email, String password) {
////        return CompletableFuture.supplyAsync(() -> {
////            Admin admin = adminRepository.findByEmail(email);
////            if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
////                return admin;
////            }
////            return null;
////        });
////    }
////
////    @Override
////    public String generateToken(Admin admin) {
////        Claims claims = Jwts.claims().setSubject(jwtProperties.getSubject());
////        claims.put("UserId", admin.getId());
////        claims.put("UserRole", admin.getRole());
////
////        return Jwts.builder()
////                .setClaims(claims)
////                .setIssuer(jwtProperties.getIssuer())
////                .setAudience(jwtProperties.getAudience())
////                .setId(UUID.randomUUID().toString())
////                .setExpiration(new Date(System.currentTimeMillis() + 864000000)) // 10 days
////                .signWith(SignatureAlgorithm.HS256, jwtProperties.getKey())
////                .compact();
////    }
////
////	@Override
////	public CompletableFuture<Void> createAsync(Admin admin) {
////		// TODO Auto-generated method stub
////		return null;
////	}
////
////	@Override
////	public String generateToken(Admin admin) {
////		// TODO Auto-generated method stub
////		return null;
////	}
////}
//
//package com.GoodWillCharity_SprinBoot_API.app.serviceimpl;
//
//import com.GoodWillCharity_SprinBoot_API.app.model.Admin;
//import com.GoodWillCharity_SprinBoot_API.app.repository.AdminRepository;
//import com.GoodWillCharity_SprinBoot_API.app.service.IAdminService;
//import com.GoodWillCharity_SprinBoot_API.config.JwtProperties;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//import java.util.UUID;
//import java.util.concurrent.CompletableFuture;
//
//@Service
//public class AdminServiceImpl implements IAdminService {
//
//    @Autowired
//    private AdminRepository adminRepository;
//
//    @Autowired
//    private JwtProperties jwtProperties;
//
//    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//    @Override
//    public CompletableFuture<Void> createAsync(Admin admin) {
//        return CompletableFuture.runAsync(() -> {
//            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
//            adminRepository.save(admin);
//        });
//    }
//
//    @Override
//    public CompletableFuture<Admin> loginAdmin(String email, String password) {
//        return CompletableFuture.supplyAsync(() -> {
//            Admin admin = adminRepository.findByEmail(email);
//            if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
//                return admin;
//            }
//            return null;
//        });
//    }
//
//    @Override
//    public String generateToken(Admin admin) {
//        Claims claims = Jwts.claims().setSubject(jwtProperties.getSubject());
//        claims.put("UserId", admin.getId());
//        claims.put("UserRole", admin.getRole());
//
//        return Jwts.builder()
//                .setClaims(claims)
//                .setIssuer(jwtProperties.getIssuer())
//                .setAudience(jwtProperties.getAudience())
//                .setId(UUID.randomUUID().toString())
//                .setExpiration(new Date(System.currentTimeMillis() + 864000000)) // 10 days
//                .signWith(SignatureAlgorithm.HS256, jwtProperties.getKey())
//                .compact();
//    }
//}
