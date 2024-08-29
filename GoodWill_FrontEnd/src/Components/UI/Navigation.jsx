import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'

import "../../assets/CSS/Navigation.css"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { EDUCATION_CHARITY_ROUTE, FOOD_CHARITY_ROUTE, GOODWILL_ABOUTUS_ROUTE, GOODWILL_CONTACTUS_ROUTE, GOODWILL_HOME_ROUTE, GOODWILL_NEWS_ROUTE, GOODWILL_NGOs_ROUTE, HEALTH_CHARITY_ROUTE, USER_LOGIN_ROUTE, USER_PROFILE_ROUTE } from '../../Constants/AppRoutes'
import { getToken, removeALL, removeToken } from '../../Services/TokenService'
import { MdAccountCircle } from 'react-icons/md'

export const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const handleLogout = () => {
    if (getToken()) {
      removeALL();
      // setIsLoggedIn(false);
      navigate(GOODWILL_HOME_ROUTE);
    } else {
      navigate(USER_LOGIN_ROUTE);
    }
  };
  const checkLogin=()=> {
    if (getToken()) {
      return 'Logout';
    } else {
      return 'Login';
    }
  }
  return (
    <div>
      <Navbar expand="lg" id="Navigation">
        <Container fluid>
          <div className='logo'>
            <Navbar.Brand href={GOODWILL_HOME_ROUTE} style={{ color: "#14C79F", fontSize: "30px", fontWeight: "600" }}>GoodWill</Navbar.Brand>
            <p>Charity Foundation</p>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 navBar"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to={GOODWILL_HOME_ROUTE} id="NavLinks">Home</Nav.Link>
              <NavDropdown className="NavLinks" title="Charities" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to={HEALTH_CHARITY_ROUTE} id="dropDownInside">Health</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={FOOD_CHARITY_ROUTE} id="dropDownInside">Food</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={EDUCATION_CHARITY_ROUTE} id="dropDownInside">Education</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={NavLink} to={GOODWILL_NEWS_ROUTE} id="NavLinks">News</Nav.Link>
              <Nav.Link as={NavLink} to={GOODWILL_ABOUTUS_ROUTE} id="NavLinks">About Us</Nav.Link>
              <Nav.Link as={NavLink} to={GOODWILL_CONTACTUS_ROUTE} id="NavLinks">Contact Us</Nav.Link>
            </Nav>
            <div className='navBtn'>
            {getToken() && (
              <Link to={USER_PROFILE_ROUTE}>
                <MdAccountCircle style={{
                  color:"#018f70",
                  fontSize:"2.6rem"
                }} className="dashBoard" />
              </Link>
            )}
            <Button  id="loginBtn" onClick={handleLogout}>
              {checkLogin()}
            </Button>
            <Link to={GOODWILL_NGOs_ROUTE}>
              <Button  id="DonateBtn">Donate Now</Button>
            </Link>
              {/* <Link to="/User-Login">
                <Button id='loginBtn'>Login</Button>
              </Link>
              <Link to="/NGOs">
                <Button id='DonateBtn'>Donate Now</Button>
              </Link> */}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}
