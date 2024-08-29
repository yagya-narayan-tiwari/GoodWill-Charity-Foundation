import React from 'react'
import '../../assets/CSS/Lib_CSS/HomeVideo.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { MdOutlineFoodBank, MdOutlineSchool } from 'react-icons/md';
import { RiFundsLine } from 'react-icons/ri';
import { FaBriefcaseMedical } from 'react-icons/fa';

export const HomeVideo = () => {
  return (
    <>
    <Container className="my-5">
      <Row className='videoMainContainer'>
        <Col md={6} className='videoContainer'>
          <video autoPlay={"true"} loop muted className="w-100">
            <source  src="public\Videos\homePageVIdeo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
        <Col md={6} className="videoLeftContainer p-5">
          <h1>Trusted non profit donation center</h1>
          <ul className='points'>
           <div>
           <li><RiFundsLine className='icon' />Best fundraising platform</li>
           <li><MdOutlineSchool className='icon' />We can help to educate them</li>
           </div>
          <div>
          <li><MdOutlineFoodBank className='icon' />
          We can help to feed them</li>
          <li><FaBriefcaseMedical className='icon' />We can help to make them healthy</li>
          </div>
          </ul>
          <p>Let's unite our efforts for a brighter future. Register your charity and work alongside other passionate organizations to create lasting, positive change.</p>
          <Button href='/NGOs' id="donate-button">Donate Now</Button>
        </Col>
      </Row>
    </Container>

    </>
  )
}
