import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "../../assets/CSS/Contact_Us.css";
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt } from 'react-icons/fa';

export const Contact_Us = () => {
  return (
    <>


      <Container className="d-flex flex-column justify-content-center align-items-center contactHeader" style={{ height: 'auto' }}>
        <h2 className="mb-4 text-center">Contact Us</h2>
        <p className="text-center" style={{ maxWidth: '90%' }}>
          We’d love to hear from you! Whether you have a question, feedback, or need assistance, feel free to reach out to us. Our team is here to help and support your journey with us.
        </p>
      </Container>

      <Container id="contact-container" className="position-relative">
        <span id="big-circle"></span>
        <img src="path/to/your/image.jpg" id="square-shape" alt="shape" />
        <Row id="contact-form" className="mt-5">
          <Col lg={6} id="contact-info" className="mb-5">
            <h3 id="contact-title">Get in Touch</h3>
            <p id="contact-text">
              We would love to hear from you! Please reach out with any questions, concerns, or feedback. Our team is here to assist you.
            </p>
            <div id="contact-details">
              <div className="contact-info-item">
                <FaLocationDot className='addIcons' />
                <span>CDAC , Mumbai 786854</span>
              </div>
              <div className="contact-info-item">
                <IoMdMail className='addIcons' />
                <span>support@goodwillcharity.org</span>
              </div>
              <div className="contact-info-item">
                <FaPhoneAlt className='addIcons' />
                <span>+91-8964869689</span>
              </div>
            </div>
            <div id="social-media">
              <p>Connect with us :</p>
              <div id="social-icons">
                <a href="#" aria-label="Facebook" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="LinkedIn" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} id="contact-form-area">
            <span id="circle-one"></span>
            <span id="circle-two"></span>
            <Form autoComplete="off" id="form-background">
              <h3 id="form-title">Contact Us</h3>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" name="phone" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} name="message" required />
              </Form.Group>
              <Button type="submit" id="submit-btn">Send</Button>
            </Form>
          </Col>
        </Row>
      </Container>

    </>
  );
};