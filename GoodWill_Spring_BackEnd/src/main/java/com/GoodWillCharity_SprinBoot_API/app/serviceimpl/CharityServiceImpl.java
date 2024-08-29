package com.GoodWillCharity_SprinBoot_API.app.serviceimpl;

import com.GoodWillCharity_SprinBoot_API.app.model.Charity;
import com.GoodWillCharity_SprinBoot_API.app.repository.CharityRepository;

//import com.GoodWillCharity_SpringBoot_API.app.model.Charity;

//import com.GoodWillCharity_SpringBoot_API.app.repository.CharityRepository;
import com.GoodWillCharity_SprinBoot_API.app.service.ICharityService;
import com.GoodWillCharity_SprinBoot_API.app.serviceimpl.FileServiceImpl.Tuple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class CharityServiceImpl implements ICharityService  {

	@Autowired
    private  CharityRepository charityRepository;
	
	@Autowired
	private FileServiceImpl fileServiceImpl;

	@Override
	public List<Charity> getAllCharities() {
		// TODO Auto-generated method stub
		return charityRepository.findAll();
	}

	@Override
	public Optional<Charity> getCharityById(String charityId) {
		// TODO Auto-generated method stub
		return charityRepository.findById(charityId);
	}

	@Override
	public Charity createCharity(Charity charity) {
		// TODO Auto-generated method stub
		return charityRepository.save(charity);
	}

	@Override
	public void deleteCharity(String charityId) {
		// TODO Auto-generated method stub
		charityRepository.deleteById(charityId);
		
	}

	@Override
	public Charity updateCharity(String charityId, Charity charity) {
	    // Fetch the existing charity by ID
	    Optional<Charity> updatedCharityOptional = charityRepository.findById(charityId);

	    if (updatedCharityOptional.isPresent()) {
	        Charity updatedCharity = updatedCharityOptional.get();

	            if (charity.getName() != null) {
	                updatedCharity.setName(charity.getName());
	            }
	            if (charity.getDescription() != null) {
	                updatedCharity.setDescription(charity.getDescription());
	            }
	            if (charity.getNgoId() != null) {
	                updatedCharity.setNgoId(charity.getNgoId());
	            }
	            if (charity.getProfilePicPath() != null) {
	                updatedCharity.setProfilePicPath(charity.getProfilePicPath());
	            }
	            if (charity.getType() != null) {
	                updatedCharity.setType(charity.getType());
	            }
//	            
	        // Save the updated charity object back to the repository
	        return charityRepository.save(updatedCharity);
	    } else {
	        throw new UsernameNotFoundException("Charity not found with id: " + charityId);
	    }
	}

	@Override
	public List<Charity> getByNgoId(String id) {
		// TODO Auto-generated method stub
		
		return charityRepository.findByNgoId(id);
	}

	

}
