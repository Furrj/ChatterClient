import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { reqRoutes } from "../utils/reqRoutes";

//TS
import { IPost } from "../views/MainFeed";
import { IUser } from "../App";

interface IProps {
  data: IPost;
  darkMode: boolean;
  userInfo: IUser;
  fetchData: () => void;
}

const Post: React.FC<IProps> = ({ data, darkMode, userInfo, fetchData }) => {
  const [points, setPoints] = useState<number>(data.likes - data.dislikes);
  const [owned, setOwned] = useState<boolean>(false);

  useEffect(() => {
    if (data.user === userInfo.username && userInfo.valid) {
      setOwned(true);
    }
  }, []);

	//COLOR THEME
  let colorMode: string = darkMode ? "" : "cardLightMode";

  //UPVOTE POST FUNCTION
  const upvote = async (e: React.MouseEvent<HTMLDivElement>): Promise<void> => {
    setPoints((points) => points + 1);
    try {
      const res = await fetch(`${reqRoutes()}/api/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.id, action: "upvote" }),
      });
      await res.json();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

	//DOWNVOTE POST FUNCTION
  const downvote = async (
    e: React.MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    setPoints((points) => points - 1);
    try {
      const res = await fetch(`${reqRoutes()}/api/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.id, action: "downvote" }),
      });
      await res.json();
      setPoints(points - 1);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

	//DELETE POST FUNCTION
  const deletePost = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    try {
      const res = await fetch(`${reqRoutes()}/api/deletePost`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: userInfo.id, postID: data.id }),
      });
      await res.json();
      fetchData();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <div className={`card ${styles.postCard} ${colorMode}`}>
      <div className={styles.cardLeft}>
        <div className={styles.like} onClick={upvote}>
          <i className="fa-solid fa-thumbs-up" />
        </div>
        <div className={styles.points}>{points}</div>
        <div className={styles.dislike} onClick={downvote}>
          <i className="fa-solid fa-thumbs-down" />
        </div>
      </div>
      <div>
        <div className={styles.cardTop}>
          <span className={styles.username}>{data.user}</span>
          <span className={styles.community}>/{data.community}</span>
          <span className={styles.date}>{data.date}</span>
        </div>
        <hr />
        <div>{data.text}</div>
        {owned && (
          <div>
            <hr />
            <button className={styles.deleteButton} onClick={deletePost}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
