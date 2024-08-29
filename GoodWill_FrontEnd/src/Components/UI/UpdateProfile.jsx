import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

import "../../assets/CSS/NGO_Registration.css";
import { useNavigate, useParams } from "react-router-dom";
import { getToken, getUserId, getUserRole } from "../../Services/TokenService";
import { NGO_LOGIN_ROUTE, USER_PROFILE_ROUTE } from "../../Constants/AppRoutes";
import { addNgo, fetchNgoData, updatedNgoData } from "../../Services/NgoService";
import { fetchDonorData, updatedDonorData } from "../../Services/DonorService";

export const UpdateProfile = () => {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [imagesFile, setImagesFile] = useState(null);
  const [userData, setUserData]= useState({ name: '', email:'',phone: '',address:'' });

  //const [user, setUser] = useState({ name: '', email:'',phone: '',address:'' });
// const param = useParams();
// console.log(param);
const handleFieldChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate(GOODWILL_HOME_ROUTE);
    }
    const fetchData=async()=>{
        let response; 
        getUserRole()==="User" && (response = await fetchDonorData(getUserId()))
        getUserRole()==="Ngo" && (response = await fetchNgoData(getUserId()))
        setUserData(response.data)
        }
        fetchData();
  }, []);
  const validateName = (name) => {
    if (typeof name !== "string" || name.trim() === "") {
      return "name required";
    }
    if (name.length < 3) {
      return "enter valid name";
    }
    if (/\d/.test(name) || /[!@#$%^&*(),.?":{}|<>]/.test(name)) {
      return "enter valid name";
    }
    return null;
  };
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;

    if (typeof email !== "string" || email.trim() === "") {
      return "email required";
    }
    if (!re.test(email)) {
      return "enter valid email";
    }
    return null;
  };
  const validatePhone = (phone) => {
    if (typeof phone !== "string" || phone.trim() === "") {
      return "phone  required";
    }
    if (phone.length != 10) {
      return "enter valid phone number";
    }
    if (!/\d/.test(phone)) {
      return "enter valid phone number";
    }
    return null;
  };
  const validatePassword = (password) => {
    if (typeof password !== "string" || password.trim() === "") {
      return "password required";
    }
    if (password.length < 6) {
      return "password must be at least 6 characters long.";
    }
    if (!/\d/.test(password)) {
      return "password must contain at least one number.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "password must contain at least one special character.";
    }
    return null;
  };

  const validateAddress = (address) => {
    if (typeof address !== "string") {
      return "address required";
    }

    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const{name,phone,email,address} = userData;
    //  const usernameError = validateUsername(username);
    //const passwordError = validatePassword(password);
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const emailError = validateEmail(email);
    // let addressError=''; 
    // getUserRole()==="Ngo" && (addressError=validateAddress(address))
    if (nameError || phoneError || emailError) {
      setErrors({
        //password: passwordError,
        name: nameError,
        phone: phoneError,
        email: emailError,
        //address: addressError,
      });
    } else {
      try {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("phone", userData.phone);
        getUserRole()==="Ngo" && formData.append("address", userData.address);
        //formData.append("password", password);
        formData.append("imagesFile", imagesFile);

        console.log("the credentials are", formData);
        let response;
        getUserRole()==="User" && (response = await updatedDonorData(getUserId(),formData))
        getUserRole()==="Ngo" && (response = await updatedNgoData(getUserId(),formData))
        console.log(response);
        if (response.status === 200) {
          console.log(response.data.message);
          setErrors({});
          console.log("Form submitted:", {
            name,
            //password,
            phone,
            email,
            address,
          });
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
      <Container id="signUpContainer">
        <Row>
          <Col
            id="leftSignUpContainer"
            lg={6}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Row id="thanksMessage" style={{ width: "80%", margin: "0 auto" }}>
              <h3>Thank You for Partnering with Us!</h3>
              <p>
                Thank you for joining our platform. Your organization is now
                part of a community dedicated to making a difference. Together,
                we can increase your impact and bring positive change to those
                who need it most.
              </p>
            </Row>
          </Col>
          <Col id="leftHomeCol" lg={6} md={6} className="p-3">
            <Row className="loginHeading text-center">
              <h6 style={{ opacity: "0.9", fontSize: "2.3rem" }}>
                Welcome to <span style={{ color: "#14C79F" }}>GoodWill</span>{" "}
                Charity Foundation
              </h6>
              <h4 id="logintxt">Register NGO</h4>
            </Row>
            <Row>
              <Form id="loginForm">
                <Form.Group controlId="name">
                  <Form.Label className="formLabel">NGO Name</Form.Label>
                  <Form.Control
                    id="formInput"
                    type="text"
                    name="name"
                    value={userData.name}
                    placeholder="name"
                    onChange={handleFieldChange}
                    isInvalid={!!errors.name}
                  />
                  {errors.name && (
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label className="formLabel">Email</Form.Label>
                  <Form.Control
                    id="formInput"
                    type="text"
                    value={userData.email}
                    name="email"
                    placeholder="email"
                    onChange={handleFieldChange}
                    isInvalid={!!errors.email}
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label className="formLabel">Phone</Form.Label>
                  <Form.Control
                    id="formInput"
                    type="text"
                    value={userData.phone}
                    name="phone"
                    placeholder="phone"
                    onChange={handleFieldChange}
                    isInvalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                {getUserRole() === "Ngo" ? (
                  <Form.Group controlId="address">
                    <Form.Label className="formLabel">Address</Form.Label>
                    <Form.Control
                      id="formInput"
                      type="text"
                      value={userData.address}
                      name="address"
                      placeholder="address"
                      onChange={handleFieldChange}
                      isInvalid={!!errors.address}
                    />
                    {errors.address && (
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                ) : (
                  ""
                )}

                {/* <Form.Group controlId="password">
                  <Form.Label className="formLabel">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={userData.password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                  />
                  {errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group> */}

                <Form.Group controlId="imagesFile">
                  <Form.Label className="formLabel">Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="imagesFile"
                    accept="image/*"
                    onChange={(e) => setImagesFile(e.target.files[0])}
                  />
                </Form.Group>

                <Button
                  onClick={handleSubmit}
                  className="mt-4"
                  id="signUpBtn"
                  type="submit"
                >
                  Register
                </Button>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
