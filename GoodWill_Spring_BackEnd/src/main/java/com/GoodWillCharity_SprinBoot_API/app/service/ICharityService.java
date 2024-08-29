
package com.GoodWillCharity_SprinBoot_API.app.service;


import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import com.GoodWillCharity_SprinBoot_API.app.model.Charity;

public interface ICharityService {
	
    public List<Charity> getAllCharities();
    
    public Optional<Charity> getCharityById(String charityId);
    
    public Charity createCharity(Charity charity);
    
    public void deleteCharity(String charityId);
    
    public Charity updateCharity(String charityId, Charity charity);

	public List<Charity> getByNgoId(String id);
    
}
