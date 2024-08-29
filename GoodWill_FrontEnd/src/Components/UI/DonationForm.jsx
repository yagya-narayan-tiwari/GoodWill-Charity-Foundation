import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'

import "../../assets/CSS/DonationForm.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { GOODWILL_HOME_ROUTE, USER_LOGIN_ROUTE } from '../../Constants/AppRoutes';
import { addDonation } from '../../Services/DonationService';
import { getToken, getUserId } from '../../Services/TokenService';

export const DonationForm = () => {

    const location  = useLocation();
    const { charityId,ngoId,NgoName,charityName } = location.state || {}; // This will retrieve the ngoId from state
    //
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState(0);
    const [message,setMessage]= useState('Good Wishes to You');

    //const [credentials, setCredentials] = useState({});
    
     const navigate = useNavigate();
    useEffect(() => {
        if (!getToken()) {
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
    const validateAddress = (address) => {
        if (typeof address !== 'string' ) {
            return 'address required';
        }
       
        return null;
    };
    const validateAmount = (amount) => {
        // typeof amount !== 'number' || 
        if (amount <= 0) {
            return 'Enter Valid Amount';
        }
        return 0;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Perform validation checks
        const addressError = validateAddress(address);
        const nameError = validateName(name);
        const phoneError = validatePhone(phone);
        const emailError = validateEmail(email);
        const amountError = validateAmount(amount);
    
        // Set errors if any are found
        setErrors({
            amount: amountError,
            address: addressError,
            name: nameError,
            phone: phoneError,
            email: emailError,
        });
    
        // If there are any errors, prevent form submission
        if (nameError || phoneError || addressError || emailError || amountError) {
            console.log('Form has errors:', { name, address, amount, message, phone, email });
            return;  // Prevent form submission
        }
    
        // If all validations pass, proceed with form submission
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("amount", amount);
            formData.append("message", message);
            formData.append("ngoId", ngoId);
            formData.append("charityId", charityId);
            formData.append("donorId", getUserId());
            formData.append("ngoName", NgoName);
            formData.append("charityName", charityName);
    
            // Submit form data
            const response = await addDonation(formData);
    
            if (response.status === 200) {
                console.log(response.data.msg);
                setErrors({});  // Clear errors after successful submission
                navigate(GOODWILL_HOME_ROUTE);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                console.log(error.response.data.msg);
            }
        }
    };
    
    
    return (
    <>
    
    <Container id ="DonationPageTitle">
    <Row>
<h2>Empower Change with Your Donation</h2>
<p>Your generous support today creates lasting impact and brings hope to those who need it most.</p>
</Row>
    </Container>
    <Container  id='signUpContainer'>

        <Row>
            <Col id='leftSignUpContainer' lg={6} md={6} style={{display:"flex" , justifyContent:"center" , alignItems:"center" , textAlign:"center"}}>
            <Row id='thanksMessage' style={{width:"80%", margin:"0 auto"}}>
                <h3>Thank You for Your Generosity!</h3>
                <p>Your decision to support this NGO means the world to us. Your donation will make a real difference in the lives of those in need. Thank you for your kindness and commitment to helping others.</p>
            </Row>
            </Col>
            <Col id='leftHomeCol' lg={6} md={6} className='p-3'>
                <Row className='loginHeading text-center'>
                    <h6 style={{ opacity: "0.9", fontSize: "2.3rem" }}>Welcome to <span style={{color:"#14C79F"}}>GoodWill</span> Charity Foundation</h6>
                    <h4 id='logintxt'>Donate Now</h4>
                </Row>
                <Row>
                    <Form id='loginForm' onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label className='formLabel'>Donor Name</Form.Label>
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
                            <Form.Label className='formLabel'>Donor Email</Form.Label>
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
                            <Form.Label className='formLabel'>Donor Phone</Form.Label>
                            <Form.Control id='formInput'
                                type="text"
                                placeholder='phone'
                                name='phone'
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
                            <Form.Label className='formLabel'>Donor Address</Form.Label>
                            <Form.Control id='formInput'
                                type="text"
                                placeholder='address'
                                name='address'
                                onChange={(e) => setAddress(e.target.value)}
                                isInvalid={!!errors.address}
                            />
                            {errors.address && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                </Form.Control.Feedback>
                            )}
                          
                        </Form.Group>
                        <Form.Group controlId="amount">
                            <Form.Label className='formLabel'>Amount</Form.Label>
                            <Form.Control id='formInput'
                                type="number"
                                placeholder='amount'
                                name='amount'
                                onChange={(e) => setAmount(e.target.value)}
                                isInvalid={!!errors.amount}
                            />
                            {errors.amount && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.amount}
                                </Form.Control.Feedback>
                            )}
                          
                        </Form.Group>

                        <Form.Group controlId="message">
                            <Form.Label className='formLabel'>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                id='formInput'
                                placeholder='Write Your Wishes'
                                name='message'
                                onChange={(e) => setMessage(e.target.value)}
                                
                            />
                            
                        </Form.Group>


                        <Button className='mt-4' id='DonateBtn1' type="submit">
                            Donate
                        </Button>

                    </Form>
                  
                </Row>
            </Col>
        </Row>

    </Container>
    
    
    </>
  )
}
