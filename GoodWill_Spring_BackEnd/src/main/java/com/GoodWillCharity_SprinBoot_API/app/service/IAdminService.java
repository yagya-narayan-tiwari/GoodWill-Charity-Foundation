package com.GoodWillCharity_SprinBoot_API.app.service;



import java.util.concurrent.CompletableFuture;

import com.GoodWillCharity_SprinBoot_API.app.model.Admin;

public interface IAdminService{
    CompletableFuture<Void> createAsync(Admin admin);

    CompletableFuture<Admin> loginAdmin(String email, String password);

    String generateToken(Admin admin);
}
