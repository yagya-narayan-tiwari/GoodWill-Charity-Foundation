import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { CharityCard } from '../Lib/CharityCard'
import { MdHealthAndSafety } from 'react-icons/md'
import { IoFastFoodSharp } from 'react-icons/io5'
import { IoMdSchool } from 'react-icons/io'
import { FaFacebook, FaLinkedin, FaUserFriends } from 'react-icons/fa'

import "../../assets/CSS/InsideNGO.css"
import { FaSquareXTwitter } from 'react-icons/fa6'
import { RiInstagramFill } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'
import { GOODWILL_NGOs_ROUTE } from '../../Constants/AppRoutes'
import { fetchNgoData, fetchNgoDataForPage } from '../../Services/NgoService'
import { fetchAllCharityByNgoId } from '../../Services/CharityService'
import { IMG_PATH } from '../../Constants/ApiRoutes'

export const InsideNGO = ({ NGOname }) => {
  const location  = useLocation();
  const { ngoId } = location.state || {}; // This will retrieve the ngoId from state
  const navigate = useNavigate();
  if (ngoId==null) {
    navigate(GOODWILL_NGOs_ROUTE);
  }
  const [ngoData, setNgoData] = useState({});
  const [ngoCharities, setNgoCharities] = useState([]);
  useEffect(() => {
    const fetchNgo = async () => {
      try {
        console.log(ngoId);
        
        const response = await fetchNgoDataForPage(ngoId);
        console.log(response);
        setNgoData(response.data );
        if (response.status===200) {
          try{
          const res= await fetchAllCharityByNgoId(response.data.id)
          console.log(res.data)
          setNgoCharities(res.data);
          }catch{
            console.log(console.error);
            
            
          }
        }
        // Assuming response has data you want to set
        
      } catch {
        console.log('inside fatch catch');
        setNgoData({});
      }
    };

    fetchNgo();
  }, []);
  
  return (
    <>
      <Container className='headerText'>
        <Row>
          <h1>Welcome to {ngoData.name} <span style={{ color: "#14C79F" }}>{NGOname}</span></h1>
          <p>Thank you for choosing to support <span style={{ color: "#14C79F" }} >{NGOname} </span>. Your willingness to contribute to our cause is deeply appreciated. Your donation will help us continue our mission of improving lives and providing opportunities to those in need. Together, we can make a significant difference. Thank you for being a part of our community and for your generous support!</p>

        </Row>
      </Container>


      <Container id='missionContainer'>
        <Row>
          <Col lg={6} className='imgContainer'>
            <Image className='img' src="public\Images\Child_Imgs\missionImg1.avif" rounded />
          </Col>
          <Col lg={6} >
            <div className='missionText'>
              <h3>Our Mission</h3>
              <p>At Goodwill Charity Foundation, we are dedicated to improving lives in underserved communities through health, food, and education initiatives. We provide access to essential medical services, nutritious meals, and quality educational resources. Our goal is to promote well-being, fight hunger, and empower individuals through education, creating a brighter future for all.</p>
              <h5>{NGOname}</h5>
            </div>

          </Col>
        </Row>

      </Container>

      <Container className='missionText'>
        <Row>
          <h3>Select a Charity to Donate</h3>
          <p style={{ width: "60%", marginTop: "1rem ", textWrap: "wrap" }}>Take a moment to explore our registered charities and choose one to support. Each donation helps us move closer to a world where everyone thrives.</p>
        </Row>
      </Container>

      <Container className=' d-flex charities'>
      {Array.isArray(ngoCharities) && ngoCharities.length > 0 ? (
        ngoCharities.map((data, index) => (
            <CharityCard key={index} charityId={data.id} ngoId={ngoData.id} src={`${IMG_PATH}/${data.profilePicPath}`} NgoName={ngoData.name} charityName={data.name} desc={data.description}></CharityCard>
          ))
        ) : (
          <p>No NGOs available</p>
        )}
        {/* <CharityCard src={"public/Images/Child_Imgs/img13.jpg"} NgoName={"GoodWill Charity Foundation"} charityName={"Health Charity"} desc={"Our health charity ensures access to quality healthcare for underserved communities. We provide medical supplies, health education, and support services to promote healthy lives for all."}></CharityCard>
        <CharityCard src={"public/Images/Child_Imgs/img13.jpg"} NgoName={"GoodWill Charity Foundation"} charityName={"Food Charity"} desc={"Our food charity fights hunger by providing nutritious meals and food supplies to those in need. We aim to ensure that everyone has access to wholesome food."}></CharityCard>
        <CharityCard src={"public/Images/Child_Imgs/img13.jpg"} NgoName={"GoodWill Charity Foundation"} charityName={"Education Charity"} desc={"Our education charity offers scholarships, school supplies, and programs to empower individuals in underserved areas. We strive to provide quality education for brighter futures."}></CharityCard> */}

      </Container>

      <Container fluid >

        <Row fluid className='whyUs'>

          <div>
            <h1>Check what makes us different from others</h1>
            <hr className='custom-hr' />
          </div>
          <div className='iconsAdda'>
            <div className='whyIcon'>
              <MdHealthAndSafety className='whyIcons' />
              <p>Good Madical Support</p>
            </div>
            <div className='whyIcon'>
              <IoFastFoodSharp className='whyIcons' />
              <p>Healthy Food</p>
            </div>
            <div className='whyIcon'>
              <IoMdSchool className='whyIcons' />
              <p>Good Education Support</p>
            </div>
            <div className='whyIcon'>
              <FaUserFriends className='whyIcons' />
              <p>Family Type Relationship</p>
            </div>
          </div>
        </Row>

      </Container>

      <Container className='contact'>
        <Row className='missionText'>
          <h3 style={{padding:"0"}}>Contact Us</h3>
          <p style={{padding:"0"}}>We'd love to hear from you. Reach out with any questions or comments.</p>
        </Row>
        <Row>
          <h6><span className='contactData'>Address :</span>  Katni , M.P. 483501</h6>
          <h6><span className='contactData'>Phone :</span>  +91-9864969484</h6>
          <h6><span className='contactData'>Email :</span>  GoodWillFoundation@gmial.com</h6>
          <span className='socialIcons'><FaFacebook className='socialIcon' /><FaSquareXTwitter className='socialIcon' /><FaLinkedin className='socialIcon' /><RiInstagramFill className='socialIcon' /></span>
          <h5 style={{color:"#14C79F" , fontSize:"0.9rem"}}>{NGOname}</h5>
        </Row>

      </Container>

    </>
  )
}
