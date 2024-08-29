
package com.GoodWillCharity_SprinBoot_API.app.model;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Transient;

//@Document(collection = "charity") // Maps this class to the "charity" collection in MongoDB
@Entity
public class Charity {

    @Id
    private String id; // The ID field will be the unique identifier for the document in MongoDB

    private String name; // Name of the charity
    
    @Column(length=800)
    private String description; // Description of the charity

   // @Field("ngo_id") // Maps the ngoId field to the "ngo_id" field in MongoDB
    private String ngoId;
    //private String donorId; // Add this field to match the repository method

    private String type;
	//@Field("profile_pic_path") // Maps the profilePicPath field to the "profile_pic_path" field in MongoDB
    private String profilePicPath;

    @Transient // This field will not be stored in the MongoDB database
    private MultipartFile imagesFile; // Used to handle file uploads in the application

    @PrePersist
    public void generateId() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}

    public String getNgoId() {
        return ngoId;
    }

    public void setNgoId(String ngoId) {
        this.ngoId = ngoId;
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
