
import './App.css'
import { InsideNGO } from './Components/UI/InsideNGO'
// import { NgoCard } from './Components/Lib/NgoCard'
import { Footer } from './Components/UI/Footer'
import { Home } from './Components/UI/Home'
import { Navigation } from './Components/UI/Navigation'
import { NGOs } from './Components/UI/NGOs'
import { News } from './Components/UI/News'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import ContactForm from './Components/UI/ContactForm'
import { Login } from './Components/UI/Login'
import { NGO_Login } from './Components/UI/NGO_Login'
import { User_Registration } from './Components/UI/User_Registration'
import { NGO_Registration } from './Components/UI/NGO_Registration'
import { DonationForm } from './Components/UI/DonationForm'
import { Volenteer } from './Components/UI/Volenteer'
import { AddCharityForm } from './Components/UI/AddCharityForm'
import { User_Profile } from './Components/UI/User_Profile'
import { ADMIN_LOGIN_ROUTE, BASE_ROUTE, DONATION_ROUTE, FORGOT_PASSWORD_ROUTE, GET_OTP_ROUTE, GOODWILL_ABOUTUS_ROUTE, GOODWILL_CONTACTUS_ROUTE, GOODWILL_HOME_ROUTE, GOODWILL_NEWS_ROUTE, GOODWILL_NGOs_DETAILS_ROUTE, GOODWILL_NGOs_ROUTE, GOODWILL_VOLUNTEER_ROUTE, NGO_LOGIN_ROUTE, NGO_SIGNUP_ROUTE, NGOs_ADD_CHARITY_ROUTE, RESET_PASSWORD_ROUTE, UPDATE_PROFILE_ROUTE, USER_LOGIN_ROUTE, USER_PROFILE_ROUTE, USER_SIGNUP_ROUTE } from './Constants/AppRoutes'
import { About_Us } from './Components/UI/About_Us'
import { Contact_Us } from './Components/UI/Contact_Us'
import { ImgTextCard } from './Components/Lib/ImgTextCard'
import { TeamCard } from './Components/Lib/TeamCard'
import { ForgetPassword } from './Components/UI/ForgetPassword'
import { Submit_OTP } from './Components/UI/Submit_OTP'
import ScrollToTopButton from './Components/Lib/ScrollToTopButton'
import { ResetPassword } from './Components/UI/ResetPassword'
import { UpdateProfile } from './Components/UI/UpdateProfile'
import { Admin_Login } from './Components/UI/Admin_Login'


// lazy loading 

/*
import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './Components/UI/Navigation';
import { Footer } from './Components/UI/Footer';
import { BASE_ROUTE, DONATION_ROUTE, GOODWILL_ABOUTUS_ROUTE, GOODWILL_CONTACTUS_ROUTE, GOODWILL_HOME_ROUTE, GOODWILL_NEWS_ROUTE, GOODWILL_NGOs_DETAILS_ROUTE, GOODWILL_NGOs_ROUTE, GOODWILL_VOLUNTEER_ROUTE, NGO_LOGIN_ROUTE, NGO_SIGNUP_ROUTE, NGOs_ADD_CHARITY_ROUTE, USER_LOGIN_ROUTE, USER_PROFILE_ROUTE, USER_SIGNUP_ROUTE } from './Constants/AppRoutes';

*/

/*
const Home = React.lazy(() => import('./Components/UI/Home'));
const News = React.lazy(() => import('./Components/UI/News'));
const About_Us = React.lazy(() => import('./Components/UI/About_Us'));
const Contact_Us = React.lazy(() => import('./Components/UI/Contact_Us'));
const NGOs = React.lazy(() => import('./Components/UI/NGOs'));
const InsideNGO = React.lazy(() => import('./Components/UI/InsideNGO'));
const Login = React.lazy(() => import('./Components/UI/Login'));
const NGO_Login = React.lazy(() => import('./Components/UI/NGO_Login'));
const User_Registration = React.lazy(() => import('./Components/UI/User_Registration'));
const NGO_Registration = React.lazy(() => import('./Components/UI/NGO_Registration'));
const DonationForm = React.lazy(() => import('./Components/UI/DonationForm'));
const Volenteer = React.lazy(() => import('./Components/UI/Volenteer'));
const AddCharityForm = React.lazy(() => import('./Components/UI/AddCharityForm'));
const User_Profile = React.lazy(() => import('./Components/UI/User_Profile'));
*/


function App() {




  return (
      <>
      {/* <h1>Hello rahul this is the react app</h1> */}


    <BrowserRouter>
    <Navigation></Navigation>

    <Routes>

    <Route path={GOODWILL_HOME_ROUTE} element={<Home/>} ></Route>
    <Route path={BASE_ROUTE} element={<Home/>} ></Route>
    <Route path={GOODWILL_NEWS_ROUTE} element={<News/>} ></Route>
    <Route path={GOODWILL_ABOUTUS_ROUTE} element={<About_Us/>} ></Route>
    <Route path={GOODWILL_CONTACTUS_ROUTE} element={<Contact_Us/>} ></Route>
    <Route path={GOODWILL_NGOs_ROUTE} element={<NGOs/>} ></Route>
    <Route path={GOODWILL_NGOs_DETAILS_ROUTE} element={<InsideNGO/>} ></Route>
    <Route path={USER_LOGIN_ROUTE} element={<Login />} />
    <Route path={NGO_LOGIN_ROUTE} element={<NGO_Login></NGO_Login>}></Route>
    <Route path={USER_SIGNUP_ROUTE} element={<User_Registration></User_Registration>}></Route>
    <Route path={NGO_SIGNUP_ROUTE} element={<NGO_Registration></NGO_Registration>}></Route>
    <Route path={DONATION_ROUTE} element={<DonationForm/>}></Route>
    <Route path={USER_PROFILE_ROUTE} element={<User_Profile/>}></Route>
    <Route path={GOODWILL_VOLUNTEER_ROUTE} element={<Volenteer/>}></Route>
    <Route path={NGOs_ADD_CHARITY_ROUTE} element={<AddCharityForm/>}></Route>
    {/* <Route path="/about-us/join-us" element={<ImgTextCard/>}></Route> */}
    <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgetPassword />}></Route>
    <Route path={GET_OTP_ROUTE} element={<Submit_OTP />}></Route>
    <Route path={RESET_PASSWORD_ROUTE} element={<ResetPassword />}></Route>
    <Route path={UPDATE_PROFILE_ROUTE} element={<UpdateProfile />}></Route>
    <Route path={ADMIN_LOGIN_ROUTE} element={<Admin_Login/>}></Route>

    </Routes>
    {/* <User_Profile></User_Profile>
    <AddCharityForm></AddCharityForm> */}
{/* <UpdateProfile/> */}
     <Footer></Footer>
      <ScrollToTopButton/>
    </BrowserRouter>

    {/* <About_Us></About_Us> */}


    {/* <Volenteer></Volenteer> */}





      </>


/*
    // --------------------------- LAZY LOADING CODE -----------------------------

    <>
      <BrowserRouter>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={GOODWILL_HOME_ROUTE} element={<Home />} />
            <Route path={BASE_ROUTE} element={<Home />} />
            <Route path={GOODWILL_NEWS_ROUTE} element={<News />} />
            <Route path={GOODWILL_ABOUTUS_ROUTE} element={<About_Us />} />
            <Route path={GOODWILL_CONTACTUS_ROUTE} element={<Contact_Us />} />
            <Route path={GOODWILL_NGOs_ROUTE} element={<NGOs />} />
            <Route path={GOODWILL_NGOs_DETAILS_ROUTE} element={<InsideNGO />} />
            <Route path={USER_LOGIN_ROUTE} element={<Login />} />
            <Route path={NGO_LOGIN_ROUTE} element={<NGO_Login />} />
            <Route path={USER_SIGNUP_ROUTE} element={<User_Registration />} />
            <Route path={NGO_SIGNUP_ROUTE} element={<NGO_Registration />} />
            <Route path={DONATION_ROUTE} element={<DonationForm />} />
            <Route path={USER_PROFILE_ROUTE} element={<User_Profile />} />
            <Route path={GOODWILL_VOLUNTEER_ROUTE} element={<Volenteer />} />
            <Route path={NGOs_ADD_CHARITY_ROUTE} element={<AddCharityForm />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
*/


  )
}

export default App
