import React, { useState } from "react";
import styles from "./NewPost.module.css";

//UTILS
import getCurrentDate from "../utils/getDate";

import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
  fetchAgain: () => void;
  darkMode: boolean;
}

interface IState {
  text: string;
}

interface IPostSend {
  text: string;
  date: string;
  user?: string;
  guestAuthor?: string;
}

const initState: IState = {
  text: "",
};

const NewPost: React.FC<IProps> = ({ userInfo, fetchAgain, darkMode }) => {
  const [postInfo, setPostInfo] = useState<IState>(initState);

  let colorMode: string = darkMode ? "" : "cardLightMode";
  let textAreaColorMode: string = darkMode ? "" : "textAreaLightMode";

  //HELPER FUNCTIONS
  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

  const submitPost = async (): Promise<void> => {
    const newPost: IPostSend = { text: postInfo.text, date: getCurrentDate() };

    if (userInfo.valid) {
      newPost.user = userInfo.id;
    } else {
      newPost.guestAuthor = userInfo.username;
    }

    try {
      const res = await fetch("http://localhost:5000/api/newPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      await res.json();
      setPostInfo(initState);
      fetchAgain();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <div className={`card ${styles.newPost} ${colorMode}`}>
      <div className={styles.cardTitle}>
        <span className={styles.username}>{userInfo.username}</span>
        <span className={styles.date}>{getCurrentDate()}</span>
        <hr />
      </div>
      <div>
        <textarea
          name="text"
          id={textAreaColorMode}
          className={`input ${styles.contentInput}`}
          onChange={inputHandler}
          value={postInfo.text}
        ></textarea>
        <hr className={styles.belowInput} />
      </div>
      <button className={`btn btn-info ${styles.submitButton}`} onClick={submitPost}>Submit</button>
    </div>
  );
};

export default NewPost;
