import React, { useState } from "react";
import styles from "./AddNewPost.module.css";

//COMPS
import NewPost from "./NewPost";

//TS
import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
  fetchAgain: () => void;
  darkMode: boolean;
}

const AddNewPost: React.FC<IProps> = ({ userInfo, fetchAgain, darkMode }) => {
  const [newPost, setNewPost] = useState<boolean>(false);

  return (
    <div
      className={`card ${styles.addCont}`}
      onClick={() => setNewPost(!newPost)}
    >
      {newPost ? (
        <NewPost
          userInfo={userInfo}
          fetchAgain={fetchAgain}
          darkMode={darkMode}
          communityMode={false}
        />
      ) : (
        "Add Post"
      )}
    </div>
  );
};

export default AddNewPost;
