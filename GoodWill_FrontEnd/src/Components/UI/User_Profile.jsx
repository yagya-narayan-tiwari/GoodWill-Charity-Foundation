import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";

import "../../assets/CSS/User_Profile.css";
// import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { DONATION_ROUTE, GOODWILL_HOME_ROUTE, GOODWILL_VOLUNTEER_ROUTE, NGOs_ADD_CHARITY_ROUTE, UPDATE_PROFILE_ROUTE } from "../../Constants/AppRoutes";
import { deleteDonor, fetchDonorData } from "../../Services/DonorService";
import { getUserId, getUserRole, removeALL } from "../../Services/TokenService";
import { IMG_PATH } from "../../Constants/ApiRoutes";
import { ConfirmDialog } from "../Lib/ConfirmDialog";
import { ToastNotification } from "../Lib/ToastNotification";
import { donationHistory, fetchAllDonationByNgoId } from "../../Services/DonationService";
import { formatDateTime } from "../../Services/UtilServices/formatDateTime";
import { deleteNgo, fetchNgoData } from "../../Services/NgoService";

export const User_Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [imgSrc, setImgSrc] = useState(
    "public/Images/UserProfileImgs/userProfileImg.jpg"
  );
  const [donationData, setDonationData] = useState([]);
  const [charityData, setCharityData] = useState([]);

  const [dateAndTime, setDateAndTime] = useState({});

  // confirmation dialag

  const [showModal, setShowModal] = useState(false);

  //Toster States
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // handin to confimation methods

  const closeModal = () => {
    setShowModal(false);
  };
  
  const handelDeleteProfile = async () => {
    let res;
    try {
        getUserRole() === "User" && ( res = await deleteDonor(userData.id))
        getUserRole() ==="Ngo" && ( res = await deleteNgo(userData.id))
      if (res.status === 200) {
        closeModal();
        removeALL();
        // Trigger the toast notification
        setToastMessage("Profile deleted successfully!");
        setShowToast(true);
        setTimeout(() => {
          navigate(GOODWILL_HOME_ROUTE);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      // You can show an error toast here if needed
      setToastMessage("An error occurred while deleting the profile.");
      setShowToast(true);
    }
  };

  // const handleUpdate = () => {
  //   const id = getUserId();
  //   // navigate(STUDENT_EDIT_FORM_ROUTE);
  //   navigate('/UpdateProfile');
  // };
  useEffect(() => {
    const getdata = async () => {
      const userid = getUserId();
      console.log("inside ud", getUserId());
      try {
        let response;
        let res;
        if(getUserRole()==="User"){
             response = await fetchDonorData(userid);
             res = await donationHistory(userid)
             setUserData(response.data);
             setDonationData(res.data);
             if (response.data.profilePicPath != null) {
                let newImg = `${IMG_PATH}/${response.data.profilePicPath}`;
                setImgSrc(newImg);
              }
        }else{
            console.log("inside else of role");
            
            response = await fetchNgoData(userid);
            res = await fetchAllDonationByNgoId(userid);
            setUserData(response.data);
            setDonationData(res.data);
            if (response.data.profilePicPath != null) {
                let newImg = `${IMG_PATH}/${response.data.profilePicPath}`;
                setImgSrc(newImg);
              }
            console.log("the data is", response.data);
        }
         

        console.log("the data is", res.data);
       
        console.log("User Data", userData);
      } catch (error) {
        console.log(error);
      }
    };
    
    getdata();
    
  }, []);

  return (
    <>
      <Container id="mainContainer">
        <Col id="profileLeftCon" lg={4}>
          <Col className="imgContainer" xs={6} md={4}>
            <Image className="img" src={imgSrc} roundedCircle />
          </Col>
          <Row id="userDetails">
            <h5>
              Name :<span>{userData.name}</span>
            </h5>
            <h5>
              Email :<span>{userData.email}</span>
            </h5>
            <h5>
              Phone :
              <span>
                <span>+91-</span>
                {userData.phone}
              </span>
            </h5>
          </Row>

          {/* it will be dynamic , if user is a volunteer then show  */}
          {/* <Row id="VolunteerDetails">
            <h5 style={{ color: "white", fontSize: "1.2rem" }}>
              Volunteer Details :
            </h5>
            <h5>
              NGO :<span>GoodWill Charity Foundation</span>
            </h5>
            <h5>
              Department :<span>Health Department</span>
            </h5>
          </Row> */}
          <Row>
            <Col id="ProfilebtnArea">
              <Row>
                <Button as={Link} to={UPDATE_PROFILE_ROUTE}  id="updateBtn">
                  Update Profile
                </Button>
              </Row>
              <Row>
                <Button
                  id="DeleteBtn"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Delete Profile
                </Button>
              </Row>
            </Col>
          </Row>
          {getUserRole() === "User" ? (
            <>
              <Row>
                <h5>Want to become Volunteer ?</h5>
                <Row>
                  <Button as={Link} to={GOODWILL_VOLUNTEER_ROUTE} id="VolunteerBtn">
                    Register for Volunteer
                  </Button>
                </Row>
              </Row>
            </>
          ) : (
            <Row>
              <h5>Want to Add Charity ?</h5>
              <Row>
                <Button as={Link} to={NGOs_ADD_CHARITY_ROUTE} id="VolunteerBtn">
                  Add Charity
                </Button>
              </Row>
            </Row>
          )}
        </Col>
        <Col id="profileRightCon">
          <Row className="mb-4">
            <h5>Donation History</h5>
          </Row>
          <Row>
            <Table striped bordered hover size="sm">
              {getUserRole() === "User" ? (
                <>
                  <thead>
                    <tr>
                      <th>NGO Name</th>
                      <th>Charity Name</th>
                      <th>Amount</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(donationData) && donationData.length > 0 ? (
                      donationData.map((data, index) => (
                        <tr>
                          <td>{data.ngoName}</td>
                          <td>{data.charityName}</td>
                          <td>{data.amount}</td>
                          {/* {setDateAndTime(formatDateTime(data.date))} */}
                          <td>
                            {formatDateTime(data.date).date} <span>-</span>{" "}
                            {formatDateTime(data.date).time}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No Donation History Available</p>
                    )}
                  </tbody>
                </>
              ) : (
                getUserRole() === "Ngo" ? (
                <>
                  <thead>
                    <tr>
                      <th>Donor Name</th>
                      <th>Charity Name</th>
                      <th>Amount</th>
                      <th>Phone Number</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(donationData) && donationData.length > 0 ? (
                      donationData.map((data, index) => (
                        <tr>
                          <td>{data.name}</td>
                          <td>{data.charityName}</td>
                          <td>{data.amount}</td>
                          <td>{data.phone}</td>
                          {/* {setDateAndTime(formatDateTime(data.date))} */}
                          <td>
                            {formatDateTime(data.date).date} <span>-</span>{" "}
                            {formatDateTime(data.date).time}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No Donation History Available</p>
                    )}
                  </tbody>
                </>
              ) : (
                      <p>No Donation History Available</p>
                    )
              )
            }
            </Table>
          </Row>
          {getUserRole === "User"?
          <Row>
            <Col lg={3}>
              <Button id="DonatePlz" as={Link} to={DONATION_ROUTE}>
                Donate Now
              </Button>
            </Col>
          </Row> : ""
          }
        </Col>
        <ConfirmDialog
          show={showModal}
          onHide={closeModal}
          message="Do you want to cancel the seat ? "
          onYes={handelDeleteProfile}
        ></ConfirmDialog>
        {/* Toast Notification */}
        <ToastNotification
          background="success" // You can set this dynamically based on the situation
          onClose={() => setShowToast(false)}
          show={showToast}
          message={toastMessage}
        />
      </Container>
    </>
  );
};
