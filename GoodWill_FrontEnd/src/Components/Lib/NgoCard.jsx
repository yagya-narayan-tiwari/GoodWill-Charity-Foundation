import { PropTypes } from 'prop-types'
import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

import "../../assets/CSS/Lib_CSS/NGO_Card.css"
import { Link, useNavigate } from 'react-router-dom';
import { GOODWILL_NGOs_DETAILS_ROUTE } from '../../Constants/AppRoutes';

export const NgoCard = ({ image, name, address, description ,ngoId}) => {
  const navigate = useNavigate();
  function handleClick(){
    if (ngoId!=null) {
      //navigate(GOODWILL_NGOs_DETAILS_ROUTE)
      navigate(GOODWILL_NGOs_DETAILS_ROUTE, { state: { ngoId } });

    }
    
  }
//  const getNgoId=()=>{
//     return ngoId;
//   }
    return (
     <>
     <Container>

     <Card className="mb-3 p-3" id='card'>
        <Row noGutters>
          <Col lg={6}>
            <Card.Img src={image} alt="NGO Image" />
          </Col>
          <Col lg={6} id='card_details'>
            <Card.Body>
              <Card.Title id='title'>{name}</Card.Title>
              <Card.Text>
                <h5 id='missionText'>Address : </h5><p id='addData'>{address}</p>
              </Card.Text>
              <Card.Text id='desc'>
                <h5 id='missionText'>Our Mission : </h5>
                {description}
                </Card.Text>
              <Button onClick={handleClick}  id='exploreBtn'>Explore More</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      
     </Container>
     
     
     
     </>
    );
  };


NgoCard.proptype={
    image: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,  
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
 
}

