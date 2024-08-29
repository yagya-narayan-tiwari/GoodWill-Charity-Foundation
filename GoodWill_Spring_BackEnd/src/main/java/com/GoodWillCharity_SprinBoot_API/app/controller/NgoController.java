package com.GoodWillCharity_SprinBoot_API.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.GoodWillCharity_SprinBoot_API.app.Util.LoginCredentials;
import com.GoodWillCharity_SprinBoot_API.app.Util.LoginResponse;
import com.GoodWillCharity_SprinBoot_API.app.model.Ngo;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.FileServiceImpl;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.FileServiceImpl.Tuple;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.NgoServiceImpl;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ngo")
@CrossOrigin(origins = "http://localhost:5173")
public class NgoController {

    @Autowired
    private NgoServiceImpl ngoService;

    @Autowired
    private FileServiceImpl fileService;

    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Ngo>> getAll() {
        List<Ngo> ngos = ngoService.getAllNgos();
        if (ngos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ngos);
    }

   // @PreAuthorize("hasRole('ADMIN') or @securityService.isOwner(#id)")
    @GetMapping("/{id}")
    public ResponseEntity<Ngo> getById(@PathVariable String id) {
        Optional<Ngo> ngo = ngoService.getNgoById(id);
        return ngo.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/ngopage/{id}")
    public ResponseEntity<Ngo> getByNgoId(@PathVariable String id) {
        Optional<Ngo> ngo = ngoService.getNgoById(id);
        return ngo.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@ModelAttribute Ngo ngo) {
        if (ngo.getImagesFile() != null) {
            Tuple<Integer, String> filePath = fileService.saveImage(ngo.getImagesFile());
            if (filePath != null) {
                ngo.setProfilePicPath(filePath.second);
            }
        }
        Ngo createdNgo = ngoService.createNgo(ngo);
        return ResponseEntity.ok("Ngo Added Into DB");
    }

    //@PreAuthorize("hasRole('ADMIN') or @securityService.isOwner(#id)")
    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable String id, @ModelAttribute Ngo ngo) {
    	System.out.println(ngo.getEmail());
    	System.out.println(ngo.getPhone());
        Optional<Ngo> existingNgo = ngoService.getNgoById(id);
        if (!existingNgo.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        if (ngo.getImagesFile() != null) {
            Tuple<Integer, String> filePath = fileService.saveImage(ngo.getImagesFile());
            if (filePath != null) {
                ngo.setProfilePicPath(filePath.second);
            } else {
                return ResponseEntity.badRequest().body("Failed to save image");
            }
        }
        ngoService.updateNgo(id, ngo);
        return ResponseEntity.ok("Update success");
    }

    //@PreAuthorize("hasRole('ADMIN') or @securityService.isOwner(#id)")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        Optional<Ngo> ngo = ngoService.getNgoById(id);
        if (!ngo.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ngoService.deleteNgo(id);
        if (ngo.get().getProfilePicPath() != null) {
            String imgStatus = fileService.deleteImage(ngo.get().getProfilePicPath());
            return ResponseEntity.ok("Delete success, " + imgStatus);
        }
        return ResponseEntity.ok("Delete success");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginCredentials loginCredentials) {
    	String email = loginCredentials.getEmail();
    	String password = loginCredentials.getPassword();
    	System.out.println("email is "+email+" password is"+password);

        Optional<Ngo> ngo = ngoService.loginNgo(email, password);
        if (ngo.isPresent()) {
            String token = ngoService.generateToken(ngo.get());
            return ResponseEntity.ok(new LoginResponse(ngo.get().getId(), ngo.get().getRole(), "Login Success", token));
        //return ResponseEntity.ok(new LoginResponse(ngo.get().getId(), ngo.get().getRole(), "Login Success"));

        } else {
           return ResponseEntity.status(404).body("Invalid login credentials");
        }
    }

    
}
