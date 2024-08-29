
package com.GoodWillCharity_SprinBoot_API.app.service;

//import com.GoodWillCharity_SpringBoot_API.app.model.Donation;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import com.GoodWillCharity_SprinBoot_API.app.model.Donation;

public interface IDonationService {
    
    List<Donation> getAllDonation();

    Optional<Donation> getDonationById(String id);

    Donation createDonation(Donation donation);

    List<Donation> getByNgoId(String id);

    List<Donation> getByDonorId(String id);
}
