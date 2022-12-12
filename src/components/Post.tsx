import React from "react";
import styles from "./Post.module.css";

import { IPost } from "../views/MainFeed";

interface IProps {
  data: IPost;
}

const Post: React.FC<IProps> = ({ data }) => {
  return (
    <div className={`card ${styles.postCard}`}>
      <div className={styles.cardLeft}>
        <div className={styles.like}>+</div>
        <div></div>
        <div className={styles.dislike}>-</div>
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
