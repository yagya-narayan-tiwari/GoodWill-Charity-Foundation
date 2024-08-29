package com.GoodWillCharity_SprinBoot_API.app.serviceimpl;


//import com.GoodWillCharity_SpringBoot_API.app.model.Donor;
//import com.GoodWillCharity_SpringBoot_API.app.repository.DonorRepository;
//import com.GoodWillCharity_SpringBoot_API.app.service.IDonorService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.GoodWillCharity_SprinBoot_API.app.model.Donor;
import com.GoodWillCharity_SprinBoot_API.app.model.Ngo;
import com.GoodWillCharity_SprinBoot_API.app.repository.DonorRepository;
import com.GoodWillCharity_SprinBoot_API.app.service.IDonorService;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.crypto.SecretKey;

@Service
public class DonorServiceImpl implements IDonorService {

    @Autowired
    private DonorRepository donorRepository;

   

    @Override
    public Donor createDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    @Override
    public void deleteDonor(String id) {
        donorRepository.deleteById(id);
    }

    @Override
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    @Override
    public Optional<Donor> getDonorById(String id) {
        return donorRepository.findById(id);
    }

    @Override
    public Donor updateDonor(String id, Donor donor) {
        // Find the existing donor by ID
        Optional<Donor> existingDonorOptional = donorRepository.findById(id);
        if (existingDonorOptional.isPresent()) {
            Donor existingDonor = existingDonorOptional.get();

            // Update only non-null properties
            if (donor.getName() != null) {
                existingDonor.setName(donor.getName());
            }
            if (donor.getEmail() != null) {
                existingDonor.setEmail(donor.getEmail());
            }
            if (donor.getPhone() != null) {
                existingDonor.setPhone(donor.getPhone());
            }
            if (donor.getProfilePicPath() != null) {
                existingDonor.setProfilePicPath(donor.getProfilePicPath());
            }
            if (donor.getRole() != null) {
                existingDonor.setRole(donor.getRole());
            }
            if (donor.getPassword() != null) {
                existingDonor.setPassword(donor.getPassword());
            }

            // Save the updated donor
            return donorRepository.save(existingDonor);
        } else {
            throw new RuntimeException("Donor not found");
        }
    }


    @Override
    public Optional<Donor>  loginDonor(String email, String password) {
    	System.out.println("email is"+email+" password is"+password);
        return donorRepository.findByEmailAndPassword(email, password);
                //.orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }

//    @Override
//    public String generateToken(Donor donor) {
//        return Jwts.builder()
//                .setSubject(jwtSubject)
//                .claim("UserId", donor.getId())
//                .claim("UserRole", donor.getRole())
//                .setIssuer(jwtIssuer)
//                .setAudience(jwtAudience)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
//                .signWith(SignatureAlgorithm.HS256, jwtSecret.getBytes())
//                .compact();
//    }
    @Value("${jwt.subject}")
    private String jwtSubject;

    @Value("${jwt.key}")
    private String jwtKey;

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    @Value("${jwt.audience}")
    private String jwtAudience;

    @Override
    public String generateToken(Donor donor) {
        // Get the role of the user
        String userRole = donor.getRole().toString();
        System.out.println(userRole);

        // Define claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", jwtSubject);
        claims.put("jti", java.util.UUID.randomUUID().toString());
        claims.put("UserId", donor.getId().toString());
        claims.put("UserRole", userRole);

        // Generate the signing key
        SecretKey key = Keys.hmacShaKeyFor(jwtKey.getBytes());

        // Build the token
        return Jwts.builder()
                .setClaims(claims)
                .setIssuer(jwtIssuer)
                .setAudience(jwtAudience)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }
}


