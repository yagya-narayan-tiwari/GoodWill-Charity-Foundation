//package com.GoodWillCharity_SprinBoot_API.app.serviceimpl;
//
//public class NgoServiceImpl {
//
//}
package com.GoodWillCharity_SprinBoot_API.app.serviceimpl;

import com.GoodWillCharity_SprinBoot_API.app.model.Ngo;
import com.GoodWillCharity_SprinBoot_API.app.repository.NgoRepository;
import com.GoodWillCharity_SprinBoot_API.app.service.INgoService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.HashMap;
import java.util.Map;
import javax.crypto.SecretKey;

@Service
public class NgoServiceImpl implements INgoService {

    @Autowired
    private NgoRepository ngoRepository;

    //@Value("${jwt.secret}")
    private String jwtSecret;

    //@Value("${jwt.expiration}")
    private Long jwtExpirationInMs;

    @Override
    public Ngo createNgo(Ngo ngo) {
        return ngoRepository.save(ngo);
    }

    @Override
    public void deleteNgo(String id) {
        ngoRepository.deleteById(id);
    }

    @Override
    public List<Ngo> getAllNgos() {
        return ngoRepository.findAll();
    }

    @Override
    public Optional<Ngo> getNgoById(String id) {
        return ngoRepository.findById(id);
    }

    @Override
    public Ngo updateNgo(String id, Ngo ngo) {
        Optional<Ngo> existingNgoOptional = ngoRepository.findById(id);
//        Optional<ngo> existingNgoOptional = ngoRepository.findById(id);
        if (existingNgoOptional.isPresent()) {
            Ngo existingNgo = existingNgoOptional.get();

            // Update only non-null properties
            if (ngo.getName() != null) {
                existingNgo.setName(ngo.getName());
            }
            if (ngo.getEmail() != null) {
                existingNgo.setEmail(ngo.getEmail());
            }
            if (ngo.getPhone() != null) {
                existingNgo.setPhone(ngo.getPhone());
            }
            if (ngo.getProfilePicPath() != null) {
                existingNgo.setProfilePicPath(ngo.getProfilePicPath());
            }
            if (ngo.getRole() != null) {
                existingNgo.setRole(ngo.getRole());
            }
//            if (ngo.getPhone() != null) {
//                existingNgo.setPhone(ngo.getPhone());
//            }
            if (ngo.getPassword() != null) {
                existingNgo.setPassword(ngo.getPassword());
            }
            if (ngo.getAddress() != null) {
                existingNgo.setAddress(ngo.getAddress());
            }

            return ngoRepository.save(existingNgo);
        } else {
            throw new UsernameNotFoundException("Ngo not found with id: " + id);
        }
    }

    @Override
    public Optional<Ngo> loginNgo(String email, String password) {
    	
        return ngoRepository.findByEmailAndPassword(email, password);
    }

//    @Override
//    public String generateToken(Ngo ngo) {
//    	jwtExpirationInMs =1000L;
//    	jwtSecret="8192E14D84A18BD1299CA87ABA858";
//    	String jwtKey="Saurabh_Dadhe";
//        if (ngo == null) {
//            throw new IllegalArgumentException("The ngo object cannot be null.");
//        }
//
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
//        //byte[] secretKeyBytes = Base64.getDecoder().decode(jwtSecret);
//        SecretKey key = Keys.hmacShaKeyFor(jwtKey.getBytes());
//
//        return Jwts.builder()
//                .setSubject(ngo.getId())
//                .claim("role", ngo.getRole())
//                .setIssuedAt(new Date())
//                .setExpiration(expiryDate)
//                .signWith(SignatureAlgorithm.HS512, key)
////                .signWith(SignatureAlgorithm.HS512, jwtSecret)
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
    public String generateToken(Ngo donor) {
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

