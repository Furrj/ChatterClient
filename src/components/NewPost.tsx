import React, { useState, useEffect } from "react";
import styles from "./NewPost.module.css";

//UTILS
import getCurrentDate from "../utils/getDate";
import generateGuestName from "../utils/generateGuestName";

import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
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

const NewPost: React.FC<IProps> = ({ userInfo }) => {
  const [postInfo, setPostInfo] = useState<IState>(initState);

  useEffect(() => {
    if (userInfo.valid === false) {
      userInfo.username = generateGuestName();
    }
  }, []);

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
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <div className={`card ${styles.newPost}`}>
      <div className="card-title">
        By <span className={styles.username}>{userInfo.username}</span> on{" "}
        {getCurrentDate()}
        <hr />
      </div>
      <div>
        <textarea
          name="text"
          id="input"
          className={`input ${styles.contentInput}`}
          onChange={inputHandler}
          value={postInfo.text}
        ></textarea>
        <hr />
      </div>
      <button onClick={submitPost}>Submit</button>
    </div>
  );
};

export default NewPost;
