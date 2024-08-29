package com.GoodWillCharity_SprinBoot_API.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.GoodWillCharity_SprinBoot_API.app.model.Donation;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.DonationServiceImpl;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donation")
@CrossOrigin(origins = "http://localhost:5173")
public class DonationController {

    @Autowired
    private DonationServiceImpl donationService;

    @GetMapping
    public ResponseEntity<List<Donation>> getAll() {
        List<Donation> donations = donationService.getAllDonation();
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donation> getById(@PathVariable String id) {
        Optional<Donation> donation = donationService.getDonationById(id);
        return donation.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Donation> create(@ModelAttribute Donation donation) {
        Donation createdDonation = donationService.createDonation(donation);
        return ResponseEntity.ok(createdDonation);
    }

    @GetMapping("/donation_list/{ngoId}")
    public ResponseEntity<List<Donation>> getByNgoId(@PathVariable String ngoId) {
        List<Donation> donations = donationService.getByNgoId(ngoId);
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/donation_history/{donorId}")
    public ResponseEntity<List<Donation>> getByDonorId(@PathVariable String donorId) {
        List<Donation> donations = donationService.getByDonorId(donorId);
        return ResponseEntity.ok(donations);
    }
}
