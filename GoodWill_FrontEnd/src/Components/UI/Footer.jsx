import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FaAddressCard, FaFacebook, FaLinkedin, FaPhoneAlt } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'
import { RiInstagramFill } from 'react-icons/ri'

import "../../assets/CSS/Footer.css"
import { Link } from 'react-router-dom'
import { DONATION_ROUTE, GOODWILL_ABOUTUS_ROUTE, GOODWILL_CONTACTUS_ROUTE, GOODWILL_HOME_ROUTE, GOODWILL_NEWS_ROUTE, GOODWILL_NGOs_ROUTE } from '../../Constants/AppRoutes'

export const Footer = () => {
  return (
    <>
      <Container fluid style={{ backgroundColor: "#1F2120", paddingBlock: "2rem", marginTop: "6rem" }}>

        <Container>
          <Row id='footerTop'>
            <Col lg={4} md={6} sm={6} xs={12}>
              <h2 style={{ color: "#14C79F" }}>GoodWill<p style={{ color: "white" }}>Charity Foundation</p></h2>
            </Col>
            <Col lg={8} md={6} sm={6} xs={12} className='icons'>
              <span className='socialIcons footerIcons'>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='socialIcon'>
                  <FaFacebook />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className='socialIcon'>
                  <FaSquareXTwitter />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className='socialIcon'>
                  <FaLinkedin />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='socialIcon'>
                  <RiInstagramFill />
                </a>
              </span>
            </Col>

          </Row>
        </Container>

        <Container className='footerBottom'>

          <Row>
            <Col lg={4} md={4}>
              <h5>About GoodWill</h5>
              <p style={{ width: "80%" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur quos quo atque pariatur impedit delectus numquam, magnam nisi quam commodi.</p>
              <Button as={Link} to={GOODWILL_NGOs_ROUTE} id='DonateBtn'>Donate Now</Button>
            </Col>
            <Col lg={4} md={4}>
              <h5>Quick Links</h5>
              <div className='footerLinks'>
                <Link to={GOODWILL_HOME_ROUTE} className='socialLinks'>Home</Link>
                <Link to={GOODWILL_NGOs_ROUTE} className='socialLinks'>NGOs</Link>
                <Link to={GOODWILL_NEWS_ROUTE} className='socialLinks'>News</Link>
                <Link to={GOODWILL_ABOUTUS_ROUTE} className='socialLinks'>About Us</Link>
                <Link to={GOODWILL_CONTACTUS_ROUTE} className='socialLinks'>Contact Us</Link>
              </div>

            </Col>
            <Col lg={4} md={4}>
              <h5>Contact Details</h5>
              <div className='footerContact'>
                <FaAddressCard className='addIcons' /><span>Katni M.P. , 483501</span><br />
                <FaPhoneAlt className='addIcons' /><span>+91-9835835879 , +91-7694589353</span><br />
                <IoMdMail className='addIcons' /><span>GoodWillCharityFoundation@gmail.com</span>
              </div>
            </Col>

          </Row>

        </Container>

      </Container>



    </>
  )
}
