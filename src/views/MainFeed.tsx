import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MainFeed.module.css";
import toggleMode from "../utils/toggleColorMode";

//COMPS
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import AddNewPost from "../components/AddNewPost";
import PolicyBox from "../components/PolicyBox";

//TS
import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
  darkMode: boolean;
  data: IPost[];
  fetchData: () => void;
}

export interface IPost {
  id: string;
  text: string;
  date: string;
  community: string;
  likes: number;
  dislikes: number;
  user?: any;
  guestAuthor?: string;
}

const MainFeed: React.FC<IProps> = ({
  userInfo,
  darkMode,
  data,
  fetchData,
}) => {
  const [rerender, setRerender] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);

	//COLOR THEME
  let colorMode: string = darkMode ? "" : "cardLightMode";
  let linkColorMode: string = darkMode ? "" : "linkLightMode";

  useEffect(() => {
    if (window.innerWidth <= 450) {
      setMobile(true);
    }

    fetchData();
    console.log("UseEffect triggered");
  }, [rerender]);

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 450) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  });

  toggleMode(darkMode);

  const fetchAgain = () => {
    setRerender(!rerender);
  };

  const content: JSX.Element[] = data.map((p) => {
    return <Post key={p.id} data={p} darkMode={darkMode} userInfo={userInfo} fetchData={fetchData} />;
  });

  return (
    <div className={styles.feedCont}>
      {!mobile && (
        <div className={styles.leftPanel}>
          <NewPost
            userInfo={userInfo}
            fetchAgain={fetchAgain}
            darkMode={darkMode}
            communityMode={false}
            currentCommunity={undefined}
          />
          <PolicyBox darkMode={darkMode} />
        </div>
      )}
      <div className={styles.postCol}>
        {mobile && (
          <div>
            <AddNewPost
              userInfo={userInfo}
              fetchAgain={fetchAgain}
              darkMode={darkMode}
            />
          </div>
        )}
        <div>{content}</div>
      </div>
      {!mobile && (
        <div className={`card ${styles.rightPanel} ${colorMode}`}>
          <div>
            <div className={`mt-2`}>Top Communities</div>
            <hr className={styles.hr} />
            <div className={styles.communityBox}>
              <Link
                to="/communities/sports"
                id={linkColorMode}
                className={`${styles.inCommunity}`}
              >
                <i className="fa-solid fa-volleyball" /> Sports
              </Link>
              <span className={styles.members}>Members: 4</span>
            </div>
            <hr className={styles.hr} />
            <div className={styles.communityBox}>
              <Link
                to="/communities/politics"
                id={linkColorMode}
                className={styles.inCommunity}
              >
                <i className="fa-solid fa-landmark" /> Politics
              </Link>
              <div className={styles.members}>Members: 9</div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.communityBox}>
              <Link
                to="/communities/music"
                id={linkColorMode}
                className={styles.inCommunity}
              >
                <i className="fa-solid fa-music" /> Music
              </Link>
              <div className={styles.members}>Members: 5</div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.communityBox}>
              <Link
                to="/communities/news"
                id={linkColorMode}
                className={styles.inCommunity}
              >
                <i className="fa-solid fa-earth-americas" /> News
              </Link>
              <div className={styles.members}>Members: 15</div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.communityBox}>
              <Link
                to="/communities/movies"
                id={linkColorMode}
                className={styles.inCommunity}
              >
                <i className="fa-solid fa-ticket-simple" /> Movies
              </Link>
              <div className={styles.members}>Members: 3</div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.communityBox}>
              <Link
                to="/communities/tech"
                id={linkColorMode}
                className={styles.inCommunity}
              >
                <i className="fa-solid fa-microchip" /> Tech
              </Link>
              <div className={styles.members}>Members: 9</div>
            </div>
            <hr className={styles.hr} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainFeed;
