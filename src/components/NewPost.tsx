import React, { useState } from "react";
import styles from "./NewPost.module.css";
import { reqRoutes } from "../utils/reqRoutes";

//UTILS
import getCurrentDate from "../utils/getDate";

//TS
import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
  fetchAgain: () => void;
  darkMode: boolean;
  communityMode: boolean;
  currentCommunity: string | undefined;
}

interface IState {
  text: string;
  community: string;
}

interface IPostSend {
  text: string;
  date: string;
  community: string | undefined;
  user?: string;
  guestAuthor?: string;
}

const initState: IState = {
  text: "",
  community: "All",
};

const NewPost: React.FC<IProps> = ({
  userInfo,
  fetchAgain,
  darkMode,
  communityMode,
  currentCommunity,
}) => {
  const [postInfo, setPostInfo] = useState<IState>(initState);

	//COLOR THEME
  let colorMode: string = darkMode ? "" : "cardLightMode";
  let textAreaColorMode: string = darkMode ? "" : "textAreaLightMode";

  //INPUT HANDLER
  const inputHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

	//SUBMIT POST FUNCTION
  const submitPost = async (): Promise<void> => {
    const newPost: IPostSend = {
      text: postInfo.text,
      date: getCurrentDate(),
      community: postInfo.community.toLowerCase(),
    };

    if (communityMode === true) {
      newPost.community = currentCommunity;
    }

    if (userInfo.valid) {
      newPost.user = userInfo.id;
    } else {
      newPost.guestAuthor = userInfo.username;
    }

    try {
      const res = await fetch(`${reqRoutes()}/api/newPost`, {
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
        {!communityMode && (
          <div>
            <div>Community: </div>
            <select
              name="community"
              id="community"
              value={postInfo.community}
              onChange={inputHandler}
            >
              <option value="All">All</option>
              <option value="Sports">Sports</option>
              <option value="Politics">Politics</option>
              <option value="Music">Music</option>
              <option value="News">News</option>
              <option value="Movies">Movies</option>
              <option value="Tech">Tech</option>
            </select>
            <hr />
          </div>
        )}
      </div>
      <button
        className={`btn btn-info ${styles.submitButton}`}
        onClick={submitPost}
      >
        Submit
      </button>
    </div>
  );
};

export default NewPost;
