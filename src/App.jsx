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
import axios from "axios";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isLoggedIn = !!sessionStorage.authToken;
  const [userDetails, setUserDetails] = useState(null);
  const [gotDetails, setGotDetails] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(apiURL + "/user/profile", {
          headers: {
            Authorization: `Bearer ${sessionStorage.authToken}`,
          },
        })
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  if (!userDetails && isLoggedIn) {
    return (
      <div className="app">
        <div className="app__page">
          <div className="app__header">
            <Header isLoggedIn={isLoggedIn} />
          </div>
          <div className="app__content"></div>
        </div>
      </div>
    );
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
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<Landing />} />

            <Route
              path="/home"
              element={
                <Home
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                  apiURL={apiURL}
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
                    gotDetails={gotDetails}
                    setGotDetails={setGotDetails}
                    apiURL={apiURL}
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
                  <Login apiURL={apiURL} />
                )
              }
            />

            <Route path="/signup" element={<SignUp apiURL={apiURL} />} />
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
