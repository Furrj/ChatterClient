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
  id: string;
  text: string;
  date: string;
  likes: number;
  dislikes: number;
  user?: any;
  guestAuthor?: string;
}

const MainFeed: React.FC<IProps> = ({ userInfo }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
    console.log("UseEffect triggered");
  }, [rerender]);

  const fetchAgain = () => {
    setRerender(!rerender);
  };

  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:5000/api");

      const rawData = await res.json();
      const newState: IPost[] = [];
      for (let d of rawData) {
        if (!d.guestAuthor) {
          const newPost: IPost = {
            id: d._id,
            text: d.text,
            date: d.date,
            likes: d.likes,
            dislikes: d.dislikes,
            user: d.author.username,
          };
          newState.push(newPost);
        } else {
          const newPost: IPost = {
            id: d._id,
            text: d.text,
            date: d.date,
            likes: d.likes,
            dislikes: d.dislikes,
            user: d.guestAuthor,
          };
          newState.push(newPost);
        }
      }
      newState.reverse();
      setPosts(newState);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const content: JSX.Element[] = posts.map((p) => {
    return <Post key={p.id} data={p} />;
  });

  return (
    <div className={styles.feedCont}>
      <div>
        <NewPost userInfo={userInfo} fetchAgain={fetchAgain} />
      </div>
      <div className={styles.postCol}>{content}</div>
      <div className={`card ${styles.rightPanel}`}>
        <div>Communities</div>
      </div>
    </div>
  );
};

export default MainFeed;
