import { useEffect } from "react";
import { Handler } from "./context/Context";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import CreateMeetUp from "./pages/CreateMeetUp";
import ListMeetups from "./pages/ListMeetups";
import ToastWindow from "./components/ToastWindow";
import Signup from "./pages/Signup";
import ValidateUser from "./pages/ValidateUser";
import UserProfile from "./pages/UserProfile";
import EditUserProfile from "./pages/EditUserProfile";
import Loading from "./components/Loading";
import MeetupDetails from "./pages/MeetupDetails";
import RecoverPwd from "./pages/RecoverPwd";
import ResetPwd from "./pages/ResetPwd";
import MeetupNotFound from "./pages/MeetupsNotFound";
import Footer from "./components/Footer";
import CookieAdvice from "./components/CookieAdvice";
import PrivatePolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import LegalAdvertisement from "./pages/LegalAdvertisement";

function App() {
  const { myData, setMyData, setmenuOn } = Handler();

  useEffect(() => {
    setMyData("hello");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myData]);
  return (
    <>
      <main
        onClick={(e) => {
          e.stopPropagation();
          setmenuOn(false);
        }}
        className={` min-h-screen  relative font-Barlow pb-20 `}
      >
        <CookieAdvice />
        <Nav />
        <Loading />
        <ToastWindow />
        <SideBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/validateUser/:regCode" element={<ValidateUser />} />
          <Route
            path="/list/meetups"
            element={
              <>
                <ListMeetups />
              </>
            }
          />
          <Route path="/new/meetup" element={<CreateMeetUp />} />
          <Route
            path="/user/details/:id"
            element={
              <>
                <UserProfile />
              </>
            }
          />
          <Route path="/edit/user/details" element={<EditUserProfile />} />
          {/* <Route path="/user/recovercode/" element={<MeetupDetails />} /> */}
          <Route
            path="/meetups/details/:id"
            element={
              <>
                <MeetupDetails />
              </>
            }
          />
          <Route path="/recoverpwd/" element={<RecoverPwd />} />
          <Route path="/resetpwd/" element={<ResetPwd />} />
          <Route
            path="/*"
            element={
              <>
                <NotFound />
              </>
            }
          />
          <Route
            path="/meetup/notfound"
            element={
              <>
                <MeetupNotFound />
              </>
            }
          />
          <Route
            path="/privatePolicy"
            element={
              <>
                <PrivatePolicy />
              </>
            }
          />
          <Route
            path="/cookiesPolicy"
            element={
              <>
                <CookiePolicy />
              </>
            }
          />
          <Route
            path="/legalAdvertisement"
            element={
              <>
                <LegalAdvertisement />
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
