package com.GoodWillCharity_SprinBoot_API.app.model;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


public class CommonProperties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected String id;

    protected String name;
    protected String email;
    protected String phone;
    protected String password;
    protected String role;
    
   // @Field("profile_pic_path")
    private String profilePicPath;

    //@Field("images_file")
    private transient MultipartFile imagesFile;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getProfilePicPath() {
        return profilePicPath;
    }

    public void setProfilePicPath(String profilePicPath) {
        this.profilePicPath = profilePicPath;
    }

    public MultipartFile getImagesFile() {
        return imagesFile;
    }

    public void setImagesFile(MultipartFile imagesFile) {
        this.imagesFile = imagesFile;
    }
}
