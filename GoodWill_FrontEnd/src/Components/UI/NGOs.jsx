import React, { useEffect,useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { NgoCard } from '../Lib/NgoCard'
import "../../assets/CSS/NGOs.css"
import { fetchAllNgo } from '../../Services/NgoService'
import { IMG_PATH } from '../../Constants/ApiRoutes'

export const NGOs = () => {
  const [ngoData, setNgoData] = useState([]);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await fetchAllNgo();
        console.log(response);
        // Assuming response has data you want to set
        setNgoData(response.data || []);
      } catch {
        console.log('inside catch');
        setNgoData([]);
      }
    };

    fetchNgos();
  }, []);
  

  return (
    <>
    
    <Container fluid id='NgoPageHeader'>

    <Row >
        <h1>Your Gateway to Making a Difference</h1>
        <p>In our network of registered NGOs, you'll find organizations that are transforming communities and creating lasting impacts. Each NGO brings a unique approach to addressing critical issues, and they need your support to continue their work. Explore their profiles to understand their missions, discover ongoing projects, and find out how you can get involved. By supporting these NGOs, you become a part of a collective effort to bring hope and change to those who need it most.</p>
    </Row>
    </Container>
    
   <Container fluid  style={{padding:"10px" , marginBlock:"4rem"}}>
   {Array.isArray(ngoData) && ngoData.length > 0 ? (
          ngoData.map((data, index) => (
            <NgoCard
              key={index}
              image={`${IMG_PATH}/${data.profilePicPath}`}
              name={data.name }
              ngoId={data.id}
              address={data.address}
              description={"Always smile without thinking about your pain, life is priceless, enjoy it, otherwise, things will not be in our favor"}
            />
          ))
        ) : (
          <p>No NGOs available</p>
        )}
    {/* {ngoData.map((data,index)=>{
      return(<NgoCard key={index} image={"#"} name={data.name || "Name Here"} address={"New City , Katni 483501"} description={"alway smile without thinkingout your pain , life is priceless enjoy it , otherwise things will not be in our favour"}></NgoCard>)
    })} */}
    
    
{/* <NgoCard image={""} name={"Always Smile Charity Foundation"} address={"New City , Katni 483501"} description={"alway smile without thinkingout your pain , life is priceless enjoy it , otherwise things will not be in our favour"}></NgoCard>
     */}
   </Container>
    </>
  )
}
