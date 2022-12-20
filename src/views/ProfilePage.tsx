import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";

//COMPS
import Post from "../components/Post";

//TS
import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
  darkMode: boolean;
}

const ProfilePage: React.FC<IProps> = ({ userInfo, darkMode }) => {
  const [posts, setPosts] = useState<any[]>([]);

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
      <Post
        key={post._id}
        darkMode={darkMode}
        data={{
          id: post._id,
          text: post.text,
          community: post.community,
          likes: post.likes,
          dislikes: post.dislikes,
          date: post.date,
        }}
      />
    );
  });

  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCont}>
        <div className={`card ${styles.profileCard} ${colorMode}`}>
          <div>
            <h3 className={styles.username}>{userInfo.username}'s Profile</h3>
          </div>
          <hr className={styles.hr} />
          <div className={styles.leftCardLayout}>
            <h4>Jackson Furr</h4>
            <div>21</div>
            <div>Male</div>
            <div className={styles.bioCont}>
              <div className={styles.bioBox}>Lorem</div>
            </div>
            <div>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>
        </div>
        <div className={`card ${styles.comCard} ${colorMode}`}>
          <h5>Communities</h5>
          <div></div>
        </div>
      </div>
      <div className={styles.rightCard}>
        <div className={`card ${styles.postHistoryTitle} ${colorMode}`}>
          <h3>Post History</h3>
        </div>
        <div>{postContent}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
