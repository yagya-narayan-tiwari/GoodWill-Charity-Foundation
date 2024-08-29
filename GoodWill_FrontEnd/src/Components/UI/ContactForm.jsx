import React, { useState } from 'react';
import '../../assets/CSS/Contact-Form.css';

function ContactForm() {
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const handleFocus = (field) => {
    setFocus({ ...focus, [field]: true });
  };

  const handleBlur = (field, e) => {
    if (e.target.value === '') {
      setFocus({ ...focus, [field]: false });
    }
  };

  return (
    <div className="container">
      <span className="big-circle"></span>
      <img src="/img/shape.png" className="square" alt="shape" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum adipisci recusandae praesentium dicta!
          </p>
          <div className="info">
            <div className="information">
              <img src="/img/location.png" className="icon" alt="location" />
              <p>92 Cherry Drive Uniondale, NY 11553</p>
            </div>
            <div className="information">
              <img src="/img/email.png" className="icon" alt="email" />
              <p>lorem@ipsum.com</p>
            </div>
            <div className="information">
              <img src="/img/phone.png" className="icon" alt="phone" />
              <p>123-456-789</p>
            </div>
          </div>
          <div className="social-media">
            <p>Connect with us :</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>
          <form autoComplete="off">
            <h3 className="title">Contact us</h3>
            <div className={`input-container ${focus.name ? 'focus' : ''}`}>
              <input
                type="text"
                name="name"
                className="input"
                onFocus={() => handleFocus('name')}
                onBlur={(e) => handleBlur('name', e)}
              />
              <label>Username</label>
              <span>Username</span>
            </div>
            <div className={`input-container ${focus.email ? 'focus' : ''}`}>
              <input
                type="email"
                name="email"
                className="input"
                onFocus={() => handleFocus('email')}
                onBlur={(e) => handleBlur('email', e)}
              />
              <label>Email</label>
              <span>Email</span>
            </div>
            <div className={`input-container ${focus.phone ? 'focus' : ''}`}>
              <input
                type="tel"
                name="phone"
                className="input"
                onFocus={() => handleFocus('phone')}
                onBlur={(e) => handleBlur('phone', e)}
              />
              <label>Phone</label>
              <span>Phone</span>
            </div>
            <div className={`input-container textarea ${focus.message ? 'focus' : ''}`}>
              <textarea
                name="message"
                className="input"
                onFocus={() => handleFocus('message')}
                onBlur={(e) => handleBlur('message', e)}
              ></textarea>
              <label>Message</label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
