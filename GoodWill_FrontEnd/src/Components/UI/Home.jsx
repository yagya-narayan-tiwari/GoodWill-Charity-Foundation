import React from 'react'
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap'
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

import "../../assets/CSS/Home.css"

import SliderImg from '../Lib/SliderImg';
import { PiHandHeartFill } from 'react-icons/pi';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { FaDonate, FaUserFriends } from 'react-icons/fa';
import { HomeVideo } from '../Lib/HomeVideo';

import { feedbackCards } from '../Lib/feedbackCards';
import { MdHealthAndSafety } from 'react-icons/md';
import { IoFastFoodSharp } from 'react-icons/io5';
import { IoMdSchool } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { GOODWILL_NGOs_ROUTE } from '../../Constants/AppRoutes';

export const Home = () => {
  
  return (
<>
<CarouselFadeExample ></CarouselFadeExample>  

<Container fluid>

<Row style={{height:"auto" , backgroundColor:"#1F2120"}}>

<Col lg-4 className='p-3 m-3' style={{ display:"flex" , alignItems:"center"}}>
<Col lg-2 style={{ display:"flex" , justifyContent:"center" , alignItems:"center"}}>
<PiHandHeartFill className="Home-Icons " style={{color:"#14C79F"}} />
</Col>
<Col lg-8 className=' r-content'>
<Row><h4>Become the Volenteer</h4></Row>
<Row>
<p>Join our community of dedicated volunteers and make a difference in the lives of those in need. Sign up today and start your journey of giving back!</p>
</Row>
</Col>
</Col>
<Col lg-4 className='p-1 m-3' style={{ display:"flex" , justifyContent:"space-between" , alignItems:"center"}}>
<Col lg-2 style={{  display:"flex" , justifyContent:"center" , alignItems:"center"}}>
<LiaUserFriendsSolid className="Home-Icons " style={{color:"#F55B14"}} />
</Col>
<Col lg-8 className=' r-content'>
<Row><h4>Become a Member</h4></Row>
<Row>
<p>Partner with us by registering your charity foundation on our platform. Together, we can amplify our impact and reach more people in need.</p>
</Row>
</Col>
</Col>
<Col lg-4 className='p-3 m-3' style={{display:"flex" , alignItems:"center"}}>
<Col lg-2 style={{ display:"flex" , justifyContent:"center" , alignItems:"center"}}>
<FaDonate className="Home-Icons " style={{color:"#020082"}} />

</Col>
<Col lg-8 className=' r-content'>
<Row><h4>Donate Now</h4></Row>
<Row>
<p>Your generosity can change lives. Donate now to support our cause and help us make a meaningful difference. Every contribution counts!</p>
</Row>
</Col>
</Col>
</Row>

{/* 3rd */}



{/* 4th  */}

{/* feedback wala bacha hai ..yaha dalege  */}

</Container>

<HomeVideo></HomeVideo>


<Container fluid >

<Row  fluid className='whyUs'>

<div>
<h1>Check what makes us different from others</h1>
<hr  className='custom-hr'/>
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
<FaUserFriends  className='whyIcons' />
<p>Family Type Relationship</p>
</div>
</div>







</Row>

</Container>
</>




  )
}


function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <SliderImg src='public/Images/Child_Imgs/img12.jpg' />
        <Carousel.Caption className='captions'>
          <p className='sliderPara'>Join us in the fight against hunger. Your support can provide nutritious meals to those who need it most, ensuring no one goes to bed hungry. Together, we can create a world where everyone has access to the food they need to thrive.</p>
          <h3>GoodWill Foundation</h3>
          <Button as={Link} to={GOODWILL_NGOs_ROUTE} id="donate-button">Start Donating</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <SliderImg src='public\Images\Child_Imgs\img15.jpg'/>
        <Carousel.Caption className='captions'>
          <p className='sliderPara'>Education is the key to breaking the cycle of poverty. Your contributions can empower children and adults with the knowledge and skills they need to succeed. Together, we can create brighter futures through the power of education.</p>
          <h3>GoodWill Foundation</h3>
          <Button as={Link} to={GOODWILL_NGOs_ROUTE} id="donate-button">Start Donating</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <SliderImg src="public\Images\Child_Imgs\img17.jpg" />
        <Carousel.Caption className='captions'>
          <p className='sliderPara'>
          Access to healthcare is a fundamental human right. By supporting our medical initiatives, you help provide essential medical care, life-saving treatments, and hope to those in need. Your generosity can heal lives and build healthier communities.
          </p>
          <h3>GoodWill Foundation</h3>
          <Button as={Link} to={GOODWILL_NGOs_ROUTE} id="donate-button">Start Donating</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;