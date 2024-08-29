import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import PropTypes from 'prop-types';

import "../../assets/CSS/Lib_CSS/TeamCard.css"

export const TeamCard = ({ imgSrc, name, desc, position, linkedInSrc, twitterSrc }) => {
  return (
    <Card id='teamCard' style={{ width: '15rem' , height:"auto" }}>
      <Card.Img id='teamImg' variant="top" src={imgSrc} alt={`${name}'s picture`} />
      <Card.Body id='team-body'>
        <Card.Title id='name'>{name}</Card.Title>
        <Card.Text>
          <p>{desc}<br></br><span id='position'>{position}</span></p>
        </Card.Text>
        <Row id='contactLinks'>
          <h6>Connect with me :</h6>
          <Col lg={6} id='contactIcon'>
            <a href={linkedInSrc} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href={twitterSrc} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
              <FaSquareXTwitter />
            </a>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

TeamCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  linkedInSrc: PropTypes.string.isRequired,
  twitterSrc: PropTypes.string.isRequired,
};