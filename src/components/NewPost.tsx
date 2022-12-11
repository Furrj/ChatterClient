import React, { useState } from "react";
import styles from "./NewPost.module.css";
import getCurrentDate from "../utils/getDate";

import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
}

interface IState {
  text: string;
}

const initState: IState = {
  text: "",
};

const NewPost: React.FC<IProps> = ({ userInfo }) => {
  const [postInfo, setPostInfo] = useState<IState>(initState);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

  const submitPost = async (): Promise<void> => {
    const newPost = {
      text: postInfo.text,
      date: getCurrentDate(),
      user: userInfo.id,
    };
    try {
      const res = await fetch("http://localhost:5000/api", {
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
