package com.GoodWillCharity_SprinBoot_API.app.Util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map all requests that start with /Resources/ to the files in the Uploads directory
        registry.addResourceHandler("/Resources/**")
                .addResourceLocations("file:" + Paths.get("").toAbsolutePath().toString() + "/Uploads/");
    }
	

}
