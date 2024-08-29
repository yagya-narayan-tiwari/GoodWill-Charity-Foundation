import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {  GET_OTP_ROUTE, USER_LOGIN_ROUTE } from '../../Constants/AppRoutes'

export const ForgetPassword = () => {

    const navigate = useNavigate();

    const handleClick = () =>{
            navigate(GET_OTP_ROUTE);
    }



  return (
    <>
    <Container className='p-4 mt-5' id='loginContainer'>
    <Row style={{display:"flex" , justifyContent:"center", alignItems:"center"}}>
               
                <Col id='leftHomeCol1' lg={6} className='p-5' style={{border:"3px solid #1F2120" , borderRadius:"15px"}}>
                    <Row className='loginHeading text-center'>
                        <h6 style={{ color:"#1F2120" , fontWeight:"600", fontSize: "1.7rem" }}>Welcome to <span style={{color:"#14C79F"}}>GoodWill</span> Charity Foundation</h6>
                        <h4 id='logintxt'>Forget Password</h4>
                        <p>Oops! Looks like your memory took a little vacation. Let’s help you get back on track!</p>
                    </Row>
                    <Row>
                        <Form id='loginForm' >
                            <Form.Group controlId="username">
                                <Form.Label className='formLabel'>Email</Form.Label>
                                <Form.Control id='formInput'
                                    type="email"
                                    placeholder='email'
                                />                              
                            </Form.Group>
                        <Button onClick={handleClick} className='mt-4' id='loginBtn1' type="submit">
                                Get OTP
                            </Button>

                        </Form>
                        <Row className='text-center'>
                                <h6>Remember Password ? 
                             <Link to={USER_LOGIN_ROUTE} className='signUp mx-1'>Login</Link>
                             </h6>
                                </Row>
                                {/* <Row className='text-center mt-3'>
                                <h6>Login as NGO Administration? 
                                    <Link to="/NGO-Login" className='NgoLogin'>NGO Login</Link>
                                </h6>
                                </Row> */}

                    </Row>
                </Col>
            </Row>

    </Container>
    </>
  )
}
