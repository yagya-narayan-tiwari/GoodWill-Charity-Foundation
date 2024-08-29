import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { ImgTextCard } from '../Lib/ImgTextCard'
import { MdHealthAndSafety } from 'react-icons/md'
import { IoFastFoodSharp } from 'react-icons/io5'
import { IoMdSchool } from 'react-icons/io'
import { FaUserFriends } from 'react-icons/fa'
import { TeamCard } from '../Lib/TeamCard'

import "../../assets/CSS/About_Us.css"

export const About_Us = () => {
    return (
        <>
          <Container fluid className='aboutPage'>
         <Container className='aboutDesc'>
         <ImgTextCard imgSrc={"public/Images/AboutUsImg/aboutHeaderImg.png"} heading={"About Us"} desc={"We are a passionate team of individuals and volunteers who believe in the power of kindness and generosity. Our goal is to create lasting change by addressing the most pressing needs in society"} isRightSide={true} isJoining={true}></ImgTextCard>
            <ImgTextCard imgSrc={"public/Images/AboutUsImg/missionImg.jpeg"} heading={"Our Mission"} desc={"At GoodWill Charity Foundation, our mission is to bring hope and relief to those in need. We are committed to making a positive impact in communities through dedicated support, education, and resources. By addressing the root causes of poverty and inequality, we strive to create sustainable change, empowering individuals and families to build brighter futures."} isRightSide={false} ></ImgTextCard>

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

            <Container id='ourTeam'>

            <Row>
                <h2 style={{textAlign:"center"}}>Meet the best team behind <br /> our success story</h2>
            </Row>
            </Container>

             <Container id='teamCardsCon' >
                   
                    <TeamCard name={"Yagya Narayan Tiwari"} desc={"CDAC Kharghar, Mumbai"} position={"Volunteer"} imgSrc={"public/Images/TeamPhotos/my_profile.jpg"} linkedInSrc={"https://linkedIn.com"} twitterSrc={"https://X.com"}></TeamCard>
                    <TeamCard name={"Saurabh dadhe wanma"} desc={"Cdac mumbai"} position={"Volunteer"} imgSrc={"public/Images/TeamPhotos/my_profile.jpg"} linkedInSrc={"https://linkedIn.com"} twitterSrc={"https://X.com"}></TeamCard>
                    <TeamCard name={"rahul"} desc={"Cdac mumbai"} position={"project lead"} imgSrc={"public/Images/Child_Imgs/img14.jpg"} linkedInSrc={"https://linkedIn.com"} twitterSrc={"https://X.com"}></TeamCard>
                    <TeamCard name={"rahul"} desc={"Cdac mumbai"} position={"project lead"} imgSrc={"public/Images/Child_Imgs/img14.jpg"} linkedInSrc={"https://linkedIn.com"} twitterSrc={"https://X.com"}></TeamCard>
                    <TeamCard name={"rahul"} desc={"Cdac mumbai"} position={"project lead"} imgSrc={"public/Images/Child_Imgs/img14.jpg"} linkedInSrc={"https://linkedIn.com"} twitterSrc={"https://X.com"}></TeamCard>
                  
            </Container> 
          </Container>
        </>
    )
}