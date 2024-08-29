import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'

import "../../assets/CSS/AddCharityForm.css"
import { useNavigate } from 'react-router-dom';
import { getToken, getUserId, getUserRole } from '../../Services/TokenService';
import { GOODWILL_HOME_ROUTE, NGO_PROFILE_ROUTE, USER_PROFILE_ROUTE } from '../../Constants/AppRoutes';
import { addCharity } from '../../Services/CharityService';

export const AddCharityForm = () => {
    const [name, setName] = useState('');
    const [imagesFile, setImagesFile] = useState(null);
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [errors, setErrors] = useState({});


    const navigate = useNavigate();
    useEffect(() => {
        if (!getToken() || getUserRole() !== "Ngo") {
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

        const validateDescription = (name) => {
            if (typeof name !== 'string' ) {
                return 'name required';
            }
            if (name.length < 50) {
                return 'too short description';
            }
           
            return null;
        };
    
        const handleSubmit = async(e) => {
            e.preventDefault();
          //  const usernameError = validateUsername(username);
            const descriptionError = validateDescription(description);
            const nameError = validateName(name);
            
            if (descriptionError || nameError) {
                setErrors({
                    
                    description: descriptionError,
                    name: nameError,
                    
                });
            } else {
                try {
                   
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("description", description);
                    formData.append("type", type);
                    formData.append("ngoId", getUserId());
                   
                    formData.append("imagesFile", imagesFile);
    
                    console.log('the credentials are',formData);
                    const response = await addCharity(formData);
                    console.log(response);
                    if (response.status === 200) {
                      console.log(response.data.message);
                      setErrors({});
                      console.log('Form submitted:', {name , description ,type});
                      navigate(USER_PROFILE_ROUTE);
                    }
                  } catch (error) {
                    console.log(error);
                    if (error.response.status === 400) {
                      console.log(error.response.data.message);
                    }
                  }
                
                // Handle actual form submission logic here, like making an API call
            }
        };
    

  return (
    <>
    <Container className='p-4 mt-5' id='loginContainer'>
    <Row style={{display:"flex" , justifyContent:"center", alignItems:"center"}}>
               
                <Col id='leftHomeCol1' lg={6} className='p-5' style={{border:"3px solid #1F2120" , borderRadius:"15px"}}>
                    <Row className='loginHeading text-center'>
                        <h6 style={{ color:"#1F2120" , fontWeight:"600", fontSize: "1.7rem" }}>Welcome to <span style={{color:"#14C79F"}}>GoodWill</span> Charity Foundation</h6>
                        <h4 id='logintxt'>Add Charity</h4>
                    </Row>
                    <Row>
                        <Form id='loginForm'  onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                    <Form.Label id='addCharityLabel'>Charity Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='name'
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)}
                                isInvalid={!!errors.name}
                            />
                            {errors.name && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            )}
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label id='addCharityLabel'>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        // value={formData.description}
                        // onChange={handleChange}
                        placeholder="Enter a description of the charity"
                        rows={3}
                        required
                        
                        onChange={(e) => setDescription(e.target.value)}
                        isInvalid={!!errors.description}
                            />
                            {errors.description && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            )}
                </Form.Group>

                <Form.Group controlId="type">
                    <Form.Label id='addCharityLabel'>Charity Type</Form.Label>
                    <Form.Control
                        as="select"
                        name="type"
                        // value={formData.type}
                        onChange={(e)=>setType(e.target.value)}
                        required
                         >
                        <option value="" >Choose...</option>
                        <option value="Education" className='charityType'>Education</option>
                        <option value="Health">Health</option>
                        <option value="Environment">Environment</option>
                        <option value="Animal Welfare">Animal Welfare</option>
                        <option value="Other">Other</option>
                    </Form.Control>
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
             
                            <Button className='mt-4' id='loginBtn1' type="submit">
                                Add Charity
                            </Button>

                        </Form>
                         
                    </Row>
                </Col>
            </Row>

    </Container>
    </>
  )
}
