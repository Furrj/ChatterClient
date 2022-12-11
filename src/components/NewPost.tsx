import React, { useState } from "react";

import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
}

interface IState {
  title: string;
  text: string;
}

const initState: IState = {
  title: "",
  text: "",
};

const NewPost: React.FC<IProps> = ({ userInfo }) => {
  const [postInfo, setPostInfo] = useState<IState>(initState);

  const getCurrentDate = (): string => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    const date = mm + "/" + dd + "/" + yyyy;
    return date;
  };

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

  const submitPost = async (): Promise<void> => {
    const newPost = {
      title: postInfo.title,
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
    <div id="newPost" className="card">
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input mt-1"
          onChange={inputHandler}
          value={postInfo.title}
        />
        <hr />
      </div>
      <div>
        <textarea
          name="text"
          id="text"
          placeholder="Content"
          className="input"
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
