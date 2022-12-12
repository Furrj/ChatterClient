import React, { useState } from "react";
import styles from "./Post.module.css";

import { IPost } from "../views/MainFeed";

interface IProps {
  data: IPost;
}

const Post: React.FC<IProps> = ({ data }) => {
  const [points, setPoints] = useState<number>(data.likes - data.dislikes);

  const upvote = async (): Promise<void> => {
    setPoints((points) => points + 1);
    try {
      const res = await fetch("http://localhost:5000/api/update", {
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

  const downvote = async (): Promise<void> => {
    setPoints((points) => points - 1);
    try {
      const res = await fetch("http://localhost:5000/api/update", {
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

  return (
    <div className={`card ${styles.postCard}`}>
      <div className={styles.cardLeft}>
        <div className={styles.like} onClick={upvote}>
          +
        </div>
        <div>{points}</div>
        <div className={styles.dislike} onClick={downvote}>
          -
        </div>
      </div>
      <div>
        <div className={styles.cardTop}>
          <div className={styles.postUsername}>
            By <span className={styles.username}>{data.user}</span> on{" "}
            {data.date}
          </div>
          <hr />
        </div>
        <div>{data.text}</div>
      </div>
    </div>
  );
};

export default Post;
