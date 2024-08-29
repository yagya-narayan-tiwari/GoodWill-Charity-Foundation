import React from 'react'
import { Button, Card } from 'react-bootstrap'

import "../../assets/CSS/Lib_CSS/CharityCard.css"
import { DONATION_ROUTE, USER_LOGIN_ROUTE } from '../../Constants/AppRoutes'
import { Link, useNavigate } from 'react-router-dom'
import { getToken } from '../../Services/TokenService'

export const CharityCard = ({src , NgoName , charityName , desc , charityId, ngoId}) => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    if (getToken()) {
      navigate(DONATION_ROUTE,{ state: { charityId, ngoId,NgoName,charityName } })
    }else{
      navigate(USER_LOGIN_ROUTE);
    }
  }
  
  return (
    
    <>
     <Card id='CharityCard' style={{ width: '19rem' , height:"auto"}}>
      <Card.Img variant="top" src={src} />
      <Card.Body id='card-body'>
        <Card.Title className='charityName'>{charityName}</Card.Title>
        <Card.Text style={{color:"#018f70" , opacity:"0.6"}}>{NgoName} </Card.Text>
        <Card.Title className='missionText'>Our Mission</Card.Title>
        <Card.Text className='desc'>{desc} </Card.Text>
        <Button onClick={handleClick} id='donate-button'  >Donate Now</Button>
      </Card.Body>
    </Card>
    
    
    </>
  )
}
