
package com.GoodWillCharity_SprinBoot_API.app.repository;
import com.GoodWillCharity_SprinBoot_API.app.model.Ngo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface NgoRepository extends JpaRepository<Ngo, String> {

	Optional<Ngo> findByEmailAndPassword(String email, String password);

//    List<Donation> findByNgoId(String ngoId);
//    List<Donation> findByDonorId(String donorId);
}
