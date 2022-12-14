import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//UI
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

//VIEWS
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import HomePage from "./views/HomePage";
import MainFeed from "./views/MainFeed";
import ProfilePage from "./views/ProfilePage";
import CommunitiesPage from "./views/CommunitiesPage";

//UTILS
import generateGuestName from "./utils/generateGuestName";

//STATE
export type IUser = {
  username: string;
  id: string;
  valid: boolean;
};

export const initState = {
  username: "",
  id: "",
  valid: false,
};

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser>(initState);

  useEffect(() => {
    if (userInfo.valid === false) {
      userInfo.username = generateGuestName();
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar
          loggedIn={loggedIn}
          setUserInfo={setUserInfo}
          setLoggedIn={setLoggedIn}
        />
        <div className="push" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                setLoggedIn={setLoggedIn}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterPage
                setLoggedIn={setLoggedIn}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route path="/mainfeed" element={<MainFeed userInfo={userInfo} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/communities/*" element={<CommunitiesPage />} />
        </Routes>
        <div className="push" />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
