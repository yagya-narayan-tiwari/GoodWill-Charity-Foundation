import PropTypes from 'prop-types'; // Correct import statement
import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

import "../../assets/CSS/Lib_CSS/ImgTextCard.CSS"
import { DONATION_ROUTE, GOODWILL_VOLUNTEER_ROUTE, USER_LOGIN_ROUTE } from '../../Constants/AppRoutes';

export const ImgTextCard = ({ imgSrc, heading, desc, isRightSide , isJoining }) => {
  return (
    <Container className="my-5">
      <Row>
        {isRightSide ? (
          <>
            <Col md={6} id='TextSide' className="d-flex flex-column justify-content-start">
              <h4>{heading}</h4>
              <p>{desc}</p>
             <Col lg={3}>
             {
                isJoining ? (
                    <>
                     <Button href={USER_LOGIN_ROUTE} className='mt-4' id='signUpBtn' >
                            Join Us
                        </Button>
                    </>
                ) : (
                    <>

                    </>
                )
              }
             </Col>
            </Col>
            <Col md={6} className="text-center">
              <Image src={imgSrc} fluid rounded />
            </Col>
          </>
        ) : (
          <>
            <Col md={6} className="text-center">
              <Image src={imgSrc} fluid rounded />
            </Col>
            <Col md={6} id='TextSide' className="d-flex flex-column justify-content-start">
              <h4>{heading}</h4>
              <p>{desc}</p>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

ImgTextCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  isRightSide: PropTypes.bool.isRequired, // Correct type
  isJoining: PropTypes.bool.isRequired, // Correct type
};


/*
<Row>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h4>About Us</h4>
          <p>
            We are a dedicated team committed to making a difference. Our mission is to provide exceptional service and support to our community. Through innovative solutions and a passion for excellence, we strive to achieve our goals and help those in need.
          </p>
        </Col>
        <Col md={6} className="text-center">
          <Image src="public\Images\AboutUsImg\aboutHeaderImg.png" fluid rounded />
        </Col>
      </Row>

*/