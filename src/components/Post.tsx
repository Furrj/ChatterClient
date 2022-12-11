import React from "react";
import styles from "./Post.module.css";

import { IPost } from "../views/MainFeed";

interface IProps {
  data: IPost;
}

const Post: React.FC<IProps> = ({ data }) => {
  return (
    <div id={styles.postCard} className="card">
      <div>
        {data.title}
        <hr />
      </div>
      <div>{data.text}</div>
    </div>
  );
};

export default Post;
