package com.GoodWillCharity_SprinBoot_API.app.repository;
import com.GoodWillCharity_SprinBoot_API.app.model.Charity;
import com.GoodWillCharity_SprinBoot_API.app.model.Donation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CharityRepository extends JpaRepository<Charity, String> {
//    List<Donation> findByCharityId(String charityId);
    @Query
	List<Charity> findByNgoId(String ngoId);
//    @Query
//    List<Charity> findByDonorId(String donorId );
  
}
