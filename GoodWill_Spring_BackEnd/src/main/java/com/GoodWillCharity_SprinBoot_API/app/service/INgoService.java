

package com.GoodWillCharity_SprinBoot_API.app.service;

import java.util.List;
import java.util.Optional;

import com.GoodWillCharity_SprinBoot_API.app.model.Ngo;

public interface INgoService {

    public List<Ngo> getAllNgos();

    public Optional<Ngo> getNgoById(String NgoId);
    
    public Ngo createNgo(Ngo ngo);
   
    public void deleteNgo(String Ngoid);

    public Ngo updateNgo(String NgoId , Ngo ngo);
   
    public Optional<Ngo> loginNgo(String email, String password);

    public String generateToken(Ngo ngo);
}
