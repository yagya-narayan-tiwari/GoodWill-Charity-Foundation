import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FORGOT_PASSWORD_ROUTE, GOODWILL_HOME_ROUTE } from '../../Constants/AppRoutes'
import { getToken, storeID, storeRole, storeToken } from '../../Services/TokenService'
import { ngoLogin } from '../../Services/NgoService'

export const NGO_Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [errors, setErrors] = useState({});
    //const [credentials, setCredentials] = useState({});
      const navigate = useNavigate();
    useEffect(() => {
        if (getToken()) {
          navigate("/home");
        }
      }, []);

      const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;

        if (typeof email !== 'string' || email.trim() === '') {
            return 'email required';
        }
        if(!re.test(email) ){
            return 'enter valid email';
        }
        return null;
    };

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        if (!/\d/.test(password)) {
            return 'Password must contain at least one number.';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return 'Password must contain at least one special character.';
        }
        return null;
    };
const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("INside handler");
        
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({
                email: emailError,
                password: passwordError,
            });
        } else {
            setErrors({});
            const credentials = { email, password };

            try {
                const response = await ngoLogin(credentials);
                console.log(response.data);
                
                if (response.status === 200) {
                    storeToken(response.data.token);
                    storeID(response.data.id);
                    storeRole(response.data.userRole)
                    navigate(GOODWILL_HOME_ROUTE);

                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.log(error.response.data.msg);
                    setLoginError(error.response.data.msg);
                    setErrors({ login: 'Invalid credentials. Please try again.' });
                } else {
                    setErrors({ login: 'An unexpected error occurred. Please try again later.' });
                }
            }
        }
    };

    return (
        <>
            <Container className='p-4 mt-5' id='loginContainer'>
                <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <Col id='leftHomeCol' lg={6} className='p-5' style={{ border: "3px solid #1F2120", borderRadius: "15px" }}>
                        <Row className='loginHeading text-center'>
                            <h6 style={{ color: "#1F2120", fontWeight: "600", fontSize: "1.7rem" }}>Welcome to <span style={{ color: "#14C79F" }}>GoodWill</span> Charity Foundation</h6>
                            <h4 id='logintxt'>NGO Login</h4>
                        </Row>
                        <Row>
                            <Form id='loginForm' onSubmit={handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label className='formLabel'>Email</Form.Label>
                                    <Form.Control id='formInput'
                                        type="email"
                                    value={email}
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    isInvalid={!!errors.email}
                                    placeholder='Email'
                                />
                                {errors.email && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                )}  
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label className='formLabel'>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isInvalid={!!errors.password}
                                    placeholder='password'
                                />
                                {errors.password && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                )}
                                    <Row className='mt-2'>
                                        <Link to={FORGOT_PASSWORD_ROUTE} id='forgotPassword' className='anchor'>
                                     Forgot Password ?
                                </Link>
                                <p style={{color:"red" , marginTop:"0.7rem"}}>{loginError}</p>
                                    </Row>
                                </Form.Group>

                                <Button className='mt-4' id='loginBtn1' type="submit">
                                    Login
                                </Button>

                            </Form>
                            <Row className='text-center'>
                                <h6>Don't have an account?
                                    <Link to="/NGO-Signup" className='signUp'>Register Now</Link>
                                </h6>
                            </Row>

                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    )
}
