import React from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'

import "../../assets/CSS/Volenteer.css"

export const Volenteer = () => {
    return (
        <>

            <Container id="DonationPageTitle">
                <Row>
                    <h2>Join Our Mission: Volunteer Today</h2>
                    <p>Volunteering with us means being part of something greater—a shared mission to uplift and empower those in need. Your dedication makes all the difference.</p>
                </Row>
            </Container>
            <Container id='signUpContainer'>

                <Row>
                    <Col id='leftSignUpContainer' lg={6} md={6} style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <Row id='thanksMessage' style={{ width: "80%", margin: "0 auto" }}>
                            <h3>Thank You for Volunteering!</h3>
                            <p>We're thrilled that you've chosen to volunteer with us. Your willingness to give your time and energy makes a tremendous difference in the lives of those we serve. Thank you for being a part of our mission to create positive change.</p>
                        </Row>
                    </Col>
                    <Col id='leftHomeCol' lg={6} md={6} className='p-3'>
                        <Row className='loginHeading text-center'>
                            <h6 style={{ opacity: "0.9", fontSize: "2.3rem" }}>Welcome to <span style={{ color: "#14C79F" }}>GoodWill</span> Charity Foundation</h6>
                            <h4 id='logintxt'>Register For Volunteer</h4>
                        </Row>
                        <Row>
                            <Form id='loginForm'>
                                <Form.Group controlId="name">
                                    <Form.Label className='formLabel'>Name</Form.Label>
                                    <Form.Control id='formInput'
                                        type="text"
                                        placeholder='name'
                                    />

                                </Form.Group>


                                <Form.Group controlId="email">
                                    <Form.Label className='formLabel'>Email</Form.Label>
                                    <Form.Control id='formInput'
                                        type="text"
                                        placeholder='email'
                                    />

                                </Form.Group>
                                <Form.Group controlId="phone">
                                    <Form.Label className='formLabel'>Phone</Form.Label>
                                    <Form.Control id='formInput'
                                        type="text"
                                        placeholder='phone'
                                    />

                                </Form.Group>

                                <Form.Group controlId="address">
                                    <Form.Label className='formLabel'>Address</Form.Label>
                                    <Form.Control id='formInput'
                                        type="text"
                                        placeholder='address'
                                    />

                                </Form.Group>
                                <Form.Group controlId="amount">
                                    <Form.Label className='formLabel'>Age</Form.Label>
                                    <Form.Control id='formInput'
                                        type="number"
                                        placeholder='amount'
                                    />

                                </Form.Group>
                                <Form.Group as={Row} controlId="programs">
                                    <Form.Label id='interest' column sm="12">
                                        Which programs are you interested in volunteering for?
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Check
                                            type="checkbox"
                                            label="Food Department"
                                        // checked={selectedPrograms.soupKitchen}
                                        // onChange={() => handleProgramChange('soupKitchen')}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Humane Society"
                                        // checked={selectedPrograms.humaneSociety}
                                        // onChange={() => handleProgramChange('humaneSociety')}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Nursing Home"
                                        // checked={selectedPrograms.nursingHome}
                                        // onChange={() => handleProgramChange('nursingHome')}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Community Garden"
                                        // checked={selectedPrograms.communityGarden}
                                        // onChange={() => handleProgramChange('communityGarden')}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Management"
                                        // checked={selectedPrograms.tutoring}
                                        // onChange={() => handleProgramChange('tutoring')}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Education Department"
                                        // checked={selectedPrograms.fireDepartment}
                                        // onChange={() => handleProgramChange('fireDepartment')}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="hoursPerWeek">
                                    <Form.Label id='interest' column sm="12">
                                        How many hours per week would you be able to dedicate to your chosen program?
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Check
                                            type="radio"
                                            label="< 3 hours"
                                            value="<3 hours"
                                        // checked={selectedHours === '<3 hours'}
                                        // onChange={handleHoursChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="3-6 hours"
                                            value="3-6 hours"
                                        // checked={selectedHours === '3-6 hours'}
                                        // onChange={handleHoursChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="6-9 hours"
                                            value="6-9 hours"
                                        // checked={selectedHours === '6-9 hours'}
                                        // onChange={handleHoursChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="9 or more"
                                            value="9 or more"
                                        // checked={selectedHours === '9 or more'}
                                        // onChange={handleHoursChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Button className='mt-4' id='DonateBtn1' type="submit">
                                    Become Volunteer
                                </Button>

                            </Form>

                        </Row>
                    </Col>
                </Row>

            </Container>


        </>
    )
}
