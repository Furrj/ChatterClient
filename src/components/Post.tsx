import React from "react";
import styles from "./Post.module.css";

import { IPost } from "../views/MainFeed";

interface IProps {
  data: IPost;
}

const Post: React.FC<IProps> = ({ data }) => {
  return (
    <div className={`card ${styles.postCard}`}>
      <div className={styles.postUsername}>
        By {data.user} on {data.date}
        <hr />
      </div>
      <h3>
        {data.title}
        <hr />
      </h3>
      <div>{data.text}</div>
    </div>
  );
};

export default Post;
