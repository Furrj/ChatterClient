import React, { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from "./CommunityPanel.module.css";

//TS
import { IUser } from "../App";

interface IProps {
  community: string | undefined;
  userInfo: IUser;
}

const CommunityPanel: React.FC<IProps> = ({ community, userInfo }) => {
  const navigate: NavigateFunction = useNavigate();

  var icon: JSX.Element | undefined;

  switch (community) {
    case "sports":
      icon = <i className="fa-solid fa-volleyball fa-2xl" />;
      break;
    case "politics":
      icon = <i className="fa-solid fa-landmark fa-2xl" />;
      break;
    case "music":
      icon = <i className="fa-solid fa-music fa-2xl" />;
      break;
    case "news":
      icon = <i className="fa-solid fa-earth-americas fa-2xl" />;
      break;
    case "movies":
      icon = <i className="fa-solid fa-ticket-simple fa-2xl" />;
      break;
    case "tech":
      icon = <i className="fa-solid fa-microchip fa-2xl" />;
      break;
  }

  const subscribeToCommunity = async (
    e: React.MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    try {
      const res = await fetch("http://localhost:5000/api/user/communities", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userInfo.id, community }),
      });
      await res.json();
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <div className={`card ${styles.panel}`}>
      <div className={styles.icon}>{icon}</div>
      <div>Welcome to /{community}!</div>
      {userInfo.valid ? (
        <div className={styles.subButton} onClick={subscribeToCommunity}>
          Subscribe
        </div>
      ) : (
        <div className={styles.subButton} onClick={() => navigate("/login")}>Login to Suscribe</div>
      )}
    </div>
  );
};

export default CommunityPanel;
