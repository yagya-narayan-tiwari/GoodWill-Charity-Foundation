import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import '../../assets/CSS/login.css'
import { Link } from 'react-router-dom'
import { FORGOT_PASSWORD_ROUTE } from '../../Constants/AppRoutes'


export const Admin_Login = () => {
    return (
        <>
            <Container className='p-4 mt-5' id='loginContainer'>
                <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <Col id='leftHomeCol1' lg={6} className='p-5' style={{ border: "3px solid #1F2120", borderRadius: "15px" }}>
                        <Row className='loginHeading text-center'>
                            <h6 style={{ color: "#1F2120", fontWeight: "600", fontSize: "1.7rem" }}>Welcome to <span style={{ color: "#14C79F" }}>GoodWill</span> Charity Foundation</h6>
                            <h4 id='logintxt'>Admin Login</h4>
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

                                <Form.Group controlId="password">
                                    <Form.Label className='formLabel'>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder='password'
                                    />
                                    <Row className='mt-2'>
                                        <Link to={FORGOT_PASSWORD_ROUTE} id='forgotPassword' className='anchor'>
                                            Forgot Password ?
                                        </Link>
                                    </Row>
                                </Form.Group>


                                <Button className='mt-4' id='loginBtn1' type="submit">
                                    Login
                                </Button>

                            </Form>
                            {/* <Row className='text-center'>
                                <h6>Don't have an account?
                                    <Link to="/User-Signup" className='signUp'> SignUp</Link>
                                </h6>
                            </Row>
                            <Row className='text-center mt-3'>
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