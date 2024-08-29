

package com.GoodWillCharity_SprinBoot_API.app.service;


import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import com.GoodWillCharity_SprinBoot_API.app.model.Donor;

public interface IDonorService {
    
    List<Donor> getAllDonors();

    Optional<Donor> getDonorById(String id);

    Donor createDonor(Donor donor);

    void deleteDonor(String id);

    Donor updateDonor(String id, Donor donor);

    Optional<Donor> loginDonor(String email, String password);

    String generateToken(Donor donor);
}
