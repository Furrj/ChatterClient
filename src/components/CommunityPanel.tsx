import React, { useEffect } from "react";
import styles from "./CommunityPanel.module.css";
import { copyFile } from "fs";

//TS
interface IProps {
  community: string | undefined;
}

const CommunityPanel: React.FC<IProps> = ({ community }) => {
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
  return (
    <div className={`card ${styles.panel}`}>
      <div className={styles.icon}>{icon}</div>
      <div>Welcome to /{community}!</div>
    </div>
  );
};

export default CommunityPanel;
