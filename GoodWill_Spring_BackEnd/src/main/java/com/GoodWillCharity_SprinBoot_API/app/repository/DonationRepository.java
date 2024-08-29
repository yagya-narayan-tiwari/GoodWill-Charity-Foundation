package com.GoodWillCharity_SprinBoot_API.app.repository;
import com.GoodWillCharity_SprinBoot_API.app.model.Donation;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, String> {
    List<Donation> findByNgoId(String ngoId);
    List<Donation> findByDonorId(String donorId);
}
