import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'

import "../../assets/CSS/NGO_Registration.css"
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../Services/TokenService';
import { NGO_LOGIN_ROUTE } from '../../Constants/AppRoutes';
import { addNgo } from '../../Services/NgoService';

export const NGO_Registration = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [imagesFile, setImagesFile] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        if (getToken()) {
          navigate(GOODWILL_HOME_ROUTE);
        }
      }, []);


    const validateName = (name) => {
        if (typeof name !== 'string' || name.trim() === '') {
            return 'name required';
        }
        if (name.length < 3) {
            return 'enter valid name';
        }
        if(/\d/.test(name) || /[!@#$%^&*(),.?":{}|<>]/.test(name) ){
            return 'enter valid name';
        }
        return null;
    };


    const validateEmail = (email) => {
        // Regular expression to validate proper email format
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // Check for empty string
        if (typeof email !== 'string' || email.trim() === '') {
            return 'email required';
        }
    
        // Basic format validation
        if (!re.test(email)) {
            return 'enter valid email address';
        }
    
        // Additional checks:
        // Ensure there's exactly one @ symbol
        const atSymbolCount = (email.match(/@/g) || []).length;
        if (atSymbolCount !== 1) {
            return 'email must contain exactly one @ symbol';
        }
    
        // Ensure no consecutive special characters like $$, .., etc.
        if (/[^a-zA-Z0-9]{2,}/.test(email.split('@')[0])) {
            return 'email contains invalid characters';
        }
    
        // Ensure no special characters at the start or end of local part
        if (/^[^a-zA-Z0-9]|[^a-zA-Z0-9]$/.test(email.split('@')[0])) {
            return 'email cannot start or end with special characters';
        }
    
        // Ensure no consecutive dots in the domain part
        const domainPart = email.split('@')[1];
        if (domainPart.includes('..')) {
            return 'domain cannot contain consecutive dots';
        }
    
        // Ensure no invalid characters in the domain part
        if (/[^a-zA-Z0-9.-]/.test(domainPart)) {
            return 'domain contains invalid characters';
        }
    
        // Ensure domain part contains a valid TLD
        if (!/\.[a-zA-Z]{2,}$/.test(domainPart)) {
            return 'domain must end with a valid top-level domain (e.g., .com, .org)';
        }
    
        return null;
    };


    const validatePhone = (phone) => {
        if (typeof phone !== 'string' || phone.trim() === '') {
            return 'phone  required';
        }
        if (phone.length !=10) {
            return 'enter valid phone number';
        }
        if(!/\d/.test(phone)){
            return 'enter valid phone number';
        }
        return null;
    };


    const validatePassword = (password) => {
        if (typeof password !== 'string' || password.trim() === '') {
            return 'password required';
        }
        if (password.length < 6) {
            return 'password must be at least 6 characters long.';
        }
        if (!/\d/.test(password)) {
            return 'password must contain at least one number.';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return 'password must contain at least one special character.';
        }
        return null;
    };


    const validateAddress = (address) => {
        if (typeof address !== 'string' ) {
            return 'address required';
        }
       
        return null;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Perform validation checks
        const passwordError = validatePassword(password);
        const nameError = validateName(name);
        const phoneError = validatePhone(phone);
        const emailError = validateEmail(email);
        const addressError = validateAddress(address);
    
        // Set errors if any are found
        setErrors({
            password: passwordError,
            name: nameError,
            phone: phoneError,
            email: emailError,
            address: addressError,
        });
    
        // If there are any errors, prevent form submission
        if (passwordError || nameError || phoneError || emailError || addressError) {
            return;
        }
    
        try {
            // Prepare form data for submission
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("password", password);
            formData.append("imagesFile", imagesFile);
    
            console.log('The credentials are:', formData);
    
            // Submit form data
            const response = await addNgo(formData);
            console.log(response);
    
            if (response.status === 200) {
                console.log(response.data.message);
                setErrors({});
                console.log('Form submitted:', { name, password, phone, email, address });
                navigate(NGO_LOGIN_ROUTE);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                console.log(error.response.data.message);
            }
        }
    };
    

  return (
    <>
    
    <Container  id='signUpContainer'>
        <Row>
            <Col id='leftSignUpContainer' lg={6} md={6} style={{display:"flex" , justifyContent:"center" , alignItems:"center" , textAlign:"center"}}>
            <Row id='thanksMessage' style={{width:"80%", margin:"0 auto"}}>
                <h3>Thank You for Partnering with Us!</h3>
                <p>Thank you for joining our platform. Your organization is now part of a community dedicated to making a difference. Together, we can increase your impact and bring positive change to those who need it most.</p>
            </Row>
            </Col>
            <Col id='leftHomeCol' lg={6} md={6} className='p-3'>
                <Row className='loginHeading text-center'>
                    <h6 style={{ opacity: "0.9", fontSize: "2.3rem" }}>Welcome to <span style={{color:"#14C79F"}}>GoodWill</span> Charity Foundation</h6>
                    <h4 id='logintxt'>Register NGO</h4>
                </Row>
                <Row>
                    <Form id='loginForm'>
                        <Form.Group controlId="name">
                            <Form.Label className='formLabel'>NGO Name</Form.Label>
                            <Form.Control id='formInput'
                                type="text"
                                name='name'
                                placeholder='name'
                                onChange={(e) => setName(e.target.value)}
                                isInvalid={!!errors.name}
                            />
                            {errors.name && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            )}
                            
                        </Form.Group>
                      
                         
                        <Form.Group controlId="email">
                            <Form.Label className='formLabel'>Email</Form.Label>
                            <Form.Control id='formInput'
                                type="text"
                                name='email'
                                placeholder='email'
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!errors.email}
                            />
                          {errors.email && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            )}
                          
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label className='formLabel'>Phone</Form.Label>
                            <Form.Control id='formInput'
                                type="text"
                                name='phone'
                                placeholder='phone'
                                onChange={(e) => setPhone(e.target.value)}
                                isInvalid={!!errors.phone}
                            />
                          {errors.phone && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            )}
                          
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label className='formLabel'>Address</Form.Label>
                            <Form.Control id='formInput'
                                type="text"
                                name='address'
                                placeholder='address'
                                onChange={(e) => setAddress(e.target.value)}
                                isInvalid={!!errors.address}
                            />
                          {/* {errors.phone && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            )} */}
                          
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label className='formLabel'>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='password'
                                placeholder='password'
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!errors.password}
                            />
                          {errors.password && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            )}
                          
                        </Form.Group>
                        
                        <Form.Group controlId="imagesFile">
                        <Form.Label className='formLabel'>Profile Image</Form.Label>
                        <Form.Control
                            type="file"
                            name='imagesFile'
                            accept="image/*"
                            onChange={(e) => setImagesFile(e.target.files[0])}
                        />
                    </Form.Group>

                        <Button onClick={handleSubmit} className='mt-4' id='signUpBtn' type="submit">
                            Register
                        </Button>

                    </Form>
                  
                </Row>
            </Col>
        </Row>

    </Container>
    
    
    </>
  )
}



