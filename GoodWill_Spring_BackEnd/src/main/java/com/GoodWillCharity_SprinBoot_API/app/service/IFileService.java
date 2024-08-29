package com.GoodWillCharity_SprinBoot_API.app.service;

import org.springframework.web.multipart.MultipartFile;
import org.yaml.snakeyaml.nodes.NodeTuple;

import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.FileServiceImpl.Tuple;

public interface IFileService {

	Tuple<Integer, String>  saveImage(MultipartFile imageFile);

    /**
     * Deletes an image file by its name.
     *
     * @param imageFileName the name of the image file to delete
     * @return a string message indicating the result of the delete operation
     */
    String deleteImage(String imageFileName);

	String saveImageSpring(MultipartFile file);


}

