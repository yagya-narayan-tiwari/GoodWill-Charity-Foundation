package com.GoodWillCharity_SprinBoot_API.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
//import com.GoodWillCharity_SpringBoot_API.app.model.Donor;
import org.springframework.stereotype.Repository;

import com.GoodWillCharity_SprinBoot_API.app.model.Donor;

import java.util.Optional;

@Repository
public interface DonorRepository extends JpaRepository<Donor, String> {
    Optional<Donor> findByEmailAndPassword(String email, String password);
}
