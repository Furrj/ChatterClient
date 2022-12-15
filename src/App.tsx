import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toggleMode from "./utils/toggleColorMode";

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
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (userInfo.valid === false) {
      userInfo.username = generateGuestName();
    }
  }, []);

  const toggleColorMode = (): void => {
    setDarkMode(!darkMode);
  }
  
  toggleMode(darkMode);

  return (
    <BrowserRouter>
      <div>
        <Navbar
          loggedIn={loggedIn}
          setUserInfo={setUserInfo}
          setLoggedIn={setLoggedIn}
          darkMode={darkMode}
          toggleColorMode={toggleColorMode}
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
                darkMode={darkMode}
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
                darkMode={darkMode}
              />
            }
          />
          <Route path="/mainfeed" element={<MainFeed userInfo={userInfo} darkMode={darkMode} />} />
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
