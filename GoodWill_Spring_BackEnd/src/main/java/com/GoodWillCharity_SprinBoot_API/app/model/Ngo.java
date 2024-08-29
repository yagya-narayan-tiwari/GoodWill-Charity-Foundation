package com.GoodWillCharity_SprinBoot_API.app.model;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Transient;

@Entity
public class Ngo {
	
	
	 	@Id
	    protected String id;

	    protected String name;
	    protected String email;
	    protected String phone;
	    protected String password;
	    protected String role;
	    private String address;
	   // @Field("profile_pic_path")
	    private String profilePicPath;

	    //@Field("images_file")
	    @Transient
	    private  MultipartFile imagesFile;

	    @PrePersist
	    public void generateId() {
	        if (this.id == null) {
	            this.id = UUID.randomUUID().toString();
	        }
	    }
	    
	    public Ngo() {
	        this.setRole("Ngo");
	    }
	    
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

    public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	// You can set a default value for the "role" field here if needed
    
}
