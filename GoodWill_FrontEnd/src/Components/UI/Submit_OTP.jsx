import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FORGOT_PASSWORD_ROUTE, RESET_PASSWORD_ROUTE, USER_LOGIN_ROUTE } from '../../Constants/AppRoutes'

export const Submit_OTP = () => {

  const navigate = useNavigate();

const [otp , setOtp] = useState();

  const handleSubmit = () => {
    navigate(RESET_PASSWORD_ROUTE);
  }


  const handleChange =(e)=>{
      const value = e.target.value;
      if (/^\d{0,4}$/.test(value)) {
        setOtp(value);
      }
  }

  console.log(otp);
  

  return (
    <>
      <Container className='p-4 mt-5' id='loginContainer'>
        <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

          <Col id='leftHomeCol1' lg={6} className='p-5' style={{ border: "3px solid #1F2120", borderRadius: "15px" }}>
            <Row className='loginHeading text-center'>
              <h6 style={{ color: "#1F2120", fontWeight: "600", fontSize: "1.7rem" }}>Welcome to <span style={{ color: "#14C79F" }}>GoodWill</span> Charity Foundation</h6>
              <h4 id='logintxt'>Submit OTP</h4>
            </Row>
            <Row>
              <p className='text-center'>Enter 4 digit OTP sent to you registered email rahultiwari@gmail.com</p>
              <Form id='loginForm' onSubmit={handleSubmit} >
                <Form.Group controlId="username">
                  <Form.Label className='formLabel text-center'>Enter OTP</Form.Label>
                  <Form.Control id='formInput'
                    type="text"
                    // placeholder='Enter OTP'
                    value={otp}
                    onChange={handleChange}
                    maxLength={4}
                    className="text-center"
                    style={{ fontSize: '1.2rem', fontWeight: "700", letterSpacing: '15px' }}
                  />
                </Form.Group>
                <Button className='mt-4' id='loginBtn1' type="submit">
                  Submit
                </Button>

              </Form>
              <Row className='text-center'>
                <h6>Wrong Email Entered ?
                  <Link to={FORGOT_PASSWORD_ROUTE} className='signUp mx-1'>Change Email</Link>
                </h6>
              </Row>
              <Row className='text-center'>
                <h6>Did not get OTP ?
                  <Link to={USER_LOGIN_ROUTE} className='signUp mx-1'>Resend OTP</Link>
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













/*


const [otp, setOtp] = useState('');

  const [resendAvailable, setResendAvailable] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    // Ensure that only digits are entered and limit to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP submission
    console.log('OTP Submitted:', otp);
  };


  const handleResend = () => {
    // Handle OTP resend logic
    console.log('OTP Resent');
    setResendAvailable(false);
    // Simulate delay before allowing another resend
    setTimeout(() => {
      setResendAvailable(true);
    }, 60000); // 60 seconds
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <h4 className="text-center mb-4">Enter OTP</h4>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={handleChange}
            maxLength={4}
            className="text-center"
            style={{ fontSize: '1.4rem', letterSpacing: '10px' }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3">
          Submit
        </Button>

        <div className="text-center mt-3">
          <a
            href="#"
            onClick={handleResend}
            className={`text-primary ${!resendAvailable ? 'disabled' : ''}`}
            style={{ textDecoration: 'none' }}
            disabled={!resendAvailable}
          >
            Resend OTP
          </a>
        </div>
      </Form>
    </Container>
  );
};


*/
