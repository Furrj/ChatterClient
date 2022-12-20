import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";

//TS
import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
  darkMode: boolean;
}

interface userPost {
  text: string;
  _id: string;
}

const ProfilePage: React.FC<IProps> = ({ userInfo, darkMode }) => {
  const [posts, setPosts] = useState<userPost[]>([]);

  const navigate: NavigateFunction = useNavigate();

  let colorMode: string = darkMode ? "" : "cardLightMode";

  useEffect(() => {
    if (userInfo.valid === false) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:5000/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userInfo.id }),
    });
    const rawData = await res.json();
    setPosts(rawData);
  };

  const postContent: JSX.Element[] = posts.map((post) => {
    return (
      <div key={post._id}>
        Text: {post.text}
        <br />
        ID: {post._id}
        <hr />
      </div>
    );
  });

  return (
    <div className={styles.mainCont}>
      <div className={`card ${styles.mainCard} ${colorMode}`}>
        <h3>{userInfo.username}'s Profile</h3>
        <hr className={styles.hr} />
        <div className={styles.infoBox}>
          <div className={styles.infoBoxLeft}>
            <div>Name: </div>
            <div>Age: </div>
          </div>
          <div className={styles.infoBoxRight}>
            <div>Bio: </div>
            <br />
          </div>
        </div>
        <div className={styles.activityBox}>
          <div className={styles.activityBoxLeft}>
            <div>Communities:</div>
          </div>
          <div className={styles.activityBoxRight}>
            <div>Posts:</div>
            <br />
            <div>{postContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
