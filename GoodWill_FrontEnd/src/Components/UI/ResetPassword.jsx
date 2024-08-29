import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { USER_LOGIN_ROUTE } from '../../Constants/AppRoutes'

export const ResetPassword = () => {
  return (
    <>
    <Container className='p-4 mt-5' id='loginContainer'>
    <Row style={{display:"flex" , justifyContent:"center", alignItems:"center"}}>
               
                <Col id='leftHomeCol1' lg={6} className='p-5' style={{border:"3px solid #1F2120" , borderRadius:"15px"}}>
                    <Row className='loginHeading text-center'>
                        <h6 style={{ color:"#1F2120" , fontWeight:"600", fontSize: "1.7rem" }}>Welcome to <span style={{color:"#14C79F"}}>GoodWill</span> Charity Foundation</h6>
                        <h4 id='logintxt'>Create New Password</h4>
                        <p>Time to give your memory a break! Let’s reset that password and get you back on track.</p>
                    </Row>
                    <Row>
                        <Form id='loginForm' >
                            <Form.Group controlId="password">
                                <Form.Label className='formLabel'>New Password</Form.Label>
                                <Form.Control id='formInput'
                                    type="text"
                                    placeholder='new password'
                                />                              
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label className='formLabel'>Confirm Password</Form.Label>
                                <Form.Control id='formInput'
                                    type="password"
                                    placeholder='confirm password'
                                />                              
                            </Form.Group>
                        <Button className='mt-4' id='loginBtn1' type="submit">
                                Reset Password
                            </Button>

                        </Form>
                       
                    </Row>
                </Col>
            </Row>

    </Container>
    </>
  )
}
