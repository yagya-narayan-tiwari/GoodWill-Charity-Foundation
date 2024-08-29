package com.GoodWillCharity_SprinBoot_API.app.serviceimpl;

//import com.GoodWillCharity_SpringBoot_API.app.model.Donation;
//import com.GoodWillCharity_SpringBoot_API.app.repository.DonationRepository;
//import com.GoodWillCharity_SpringBoot_API.app.service.IDonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GoodWillCharity_SprinBoot_API.app.model.Donation;
import com.GoodWillCharity_SprinBoot_API.app.repository.DonationRepository;
import com.GoodWillCharity_SprinBoot_API.app.service.IDonationService;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class DonationServiceImpl implements IDonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Override
    public Donation createDonation(Donation donation) {
          return donationRepository.save(donation);
    }

    @Override
    public List<Donation> getAllDonation() {
        return  donationRepository.findAll();
    }

    @Override
    public Optional<Donation> getDonationById(String id) {
        return  donationRepository.findById(id);
    }

    @Override
    public List<Donation> getByNgoId(String ngoId) {
        return  donationRepository.findByNgoId(ngoId);
    }

    @Override
    public List<Donation> getByDonorId(String donorId) {
        return  donationRepository.findByDonorId(donorId);
    }
}
