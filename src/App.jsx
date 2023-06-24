import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { useEffect, useState } from "react";
import { obtainUserDetails } from "../src/utils/database";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  // determine whether to show login or profile?
  const isLoggedIn = !!sessionStorage.authToken;
  const [userSongList, setUserSongList] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    obtainUserDetails(setUserDetails);
  }, [userDetails]);

  if (!userDetails && isLoggedIn) {
    return <div className="">loading</div>;
  }

  return (
    <div className={`${isLandingPage ? "app app--landing" : "app"}`}>
      <div className="app__page">
        {!isLandingPage && (
          <div className="app__header">
            <Header isLoggedIn={isLoggedIn} />
          </div>
        )}

        <div className="app__content">
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route
              path="/home"
              element={
                <Home
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                />
              }
            />

            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <Profile
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />

            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate replace to="/profile" />
                ) : (
                  <Login isLoggedIn={isLoggedIn} />
                )
              }
            />

            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        {!isLandingPage && (
          <div className="app__footer">
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
