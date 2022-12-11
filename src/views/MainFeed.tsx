import React, { useEffect, useState } from "react";
import styles from "./MainFeed.module.css";

//COMPS
import Post from "../components/Post";
import NewPost from "../components/NewPost";

import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
}

export interface IPost {
  title: string;
  text: string;
  date: string;
  user: any;
}

const MainFeed: React.FC<IProps> = ({ userInfo }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:5000/api");

      const rawData = await res.json();
      const newState: IPost[] = [];
      for (let d of rawData) {
        const newPost: IPost = {
          title: d.title,
          text: d.text,
          date: d.date,
          user: d.author.username,
        };
        newState.push(newPost);
      }
      setPosts(newState);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const content: JSX.Element[] = posts.map((p) => {
    return <Post data={p} />;
  });

  return (
    <div id={styles.feedCont}>
      <div>{userInfo.valid && <NewPost userInfo={userInfo} />}</div>
      <div id={styles.postCol}>{content}</div>
      <div></div>
    </div>
  );
};

export default MainFeed;
