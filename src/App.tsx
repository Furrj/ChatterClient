import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toggleMode from "./utils/toggleColorMode";
import { reqRoutes } from "./utils/reqRoutes";

//UI
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

//VIEWS
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import MainFeed from "./views/MainFeed";
import ProfilePage from "./views/ProfilePage";
import Community from "./views/Community";

//UTILS
import generateGuestName from "./utils/generateGuestName";

//TS
import { IPost } from "./views/MainFeed";

export type IUser = {
  username: string;
  id: string;
  valid: boolean;
};

//STATE
export const initState = {
  username: generateGuestName(),
  id: "",
  valid: false,
};

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUser>(initState);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);

  //CHECK IF LOGGED IN AND GENERATE GUESTNAME
  useEffect(() => {
    userValidation();
  }, []);

  //CHECK USER INFO
  const userValidation = async (): Promise<void> => {
    const req = await fetch(`${reqRoutes()}/validate`, {
      method: "PUT",
      credentials: "include",
    });
    const res = await req.json();
    console.log(res);
    if (res.valid === true) {
      setUserInfo(res);
    } else {
      setUserInfo(initState);
    }
  };

  //DATA
  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch(`${reqRoutes()}/api`);

      const rawData = await res.json();
      const newState: IPost[] = [];
      for (let d of rawData) {
        if (!d.guestAuthor) {
          const newPost: IPost = {
            id: d._id,
            text: d.text,
            community: d.community,
            date: d.date,
            likes: d.likes,
            dislikes: d.dislikes,
            user: d.author.username,
          };
          newState.push(newPost);
        } else {
          const newPost: IPost = {
            id: d._id,
            text: d.text,
            date: d.date,
            community: d.community,
            likes: d.likes,
            dislikes: d.dislikes,
            user: d.guestAuthor,
          };
          newState.push(newPost);
        }
      }
      newState.reverse();
      setPosts(newState);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const toggleColorMode = (): void => {
    setDarkMode(!darkMode);
  };

  toggleMode(darkMode);

  return (
    <BrowserRouter>
      <div>
        <Navbar
          loggedIn={userInfo.valid}
          toggleColorMode={toggleColorMode}
          userValidation={userValidation}
        />
        <div className="push" />
        <Routes>
          <Route
            path="/"
            element={
              <MainFeed
                userInfo={userInfo}
                darkMode={darkMode}
                data={posts}
                fetchData={fetchData}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
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
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                darkMode={darkMode}
              />
            }
          />
          <Route
            path="/mainfeed"
            element={
              <MainFeed
                userInfo={userInfo}
                darkMode={darkMode}
                data={posts}
                fetchData={fetchData}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                userInfo={userInfo}
                darkMode={darkMode}
                fetchData={fetchData}
              />
            }
          />
          <Route
            path="/communities/:com"
            element={
              <Community
                userInfo={userInfo}
                darkMode={darkMode}
                data={posts}
                fetchData={fetchData}
              />
            }
          />
        </Routes>
        <div className="push" />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
