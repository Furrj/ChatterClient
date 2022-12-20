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

interface IProfileInfo {
  name: string | undefined;
  age: number | undefined;
  gender: string | undefined;
  bio: string | undefined;
}

const initProfileInfoState = {
  name: "",
  age: undefined,
  gender: "",
  bio: "",
};

const ProfilePage: React.FC<IProps> = ({ userInfo, darkMode }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] =
    useState<IProfileInfo>(initProfileInfoState);

  const navigate: NavigateFunction = useNavigate();

  let colorMode: string = darkMode ? "" : "cardLightMode";

  useEffect(() => {
    if (userInfo.valid === false) {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, []);

  //HELPER FUNCTIONS
  const fetchUserData = async () => {
    const res = await fetch("http://localhost:5000/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userInfo.id }),
    });
    const rawData = await res.json();
    setPosts(rawData.posts);
    setProfileInfo({
      name: rawData.name,
      age: rawData.age,
      gender: rawData.gender,
      bio: rawData.bio,
    });
  };

  const submitInfo = async () => {
    const res = await fetch("http://localhost:5000/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userInfo.id,
        name: profileInfo.name,
        age: profileInfo.age,
        gender: profileInfo.gender,
        bio: profileInfo.bio,
      }),
    });
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

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.mainCont}>
      <div className={styles.leftCont}>
        <div className={`card ${styles.profileCard} ${colorMode}`}>
          <div>
            <h3 className={styles.username}>{userInfo.username}'s Profile</h3>
          </div>
          <hr className={styles.hr} />
          <div className={styles.leftCardLayout}>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={profileInfo.name}
                onChange={inputHandler}
              />
            ) : (
              <h4>{profileInfo.name}</h4>
            )}
            {editMode ? (
              <input
                type="number"
                name="age"
                value={profileInfo.age}
                onChange={inputHandler}
              />
            ) : (
              <div>{profileInfo.age}</div>
            )}
            {editMode ? (
              <input
                type="text"
                name="gender"
                value={profileInfo.gender}
                onChange={inputHandler}
              />
            ) : (
              <div>{profileInfo.gender}</div>
            )}
            <div className={styles.bioCont}>
              <div className={styles.bioBox}>
                {editMode ? (
                  <textarea
                    name="bio"
                    onChange={inputHandler}
                    value={profileInfo.bio}
                    className={styles.textArea}
                  ></textarea>
                ) : (
                  <div>{profileInfo.bio}</div>
                )}
              </div>
            </div>
            <div>
              {editMode ? (
                <button
                  className={styles.editButton}
                  onClick={() => {
                    setEditMode(!editMode);
                    submitInfo();
                  }}
                >
                  Submit
                </button>
              ) : (
                <button
                  className={styles.editButton}
                  onClick={() => {
                    setEditMode(!editMode);
                  }}
                >
                  Edit
                </button>
              )}
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
