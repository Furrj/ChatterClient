import React from "react";
import styles from "./PolicyBox.module.css";

//TS
interface IProps {
  darkMode: boolean;
}

const PolicyBox: React.FC<IProps> = ({ darkMode }) => {
	//COLOR THEME
  let colorMode: string = darkMode ? "" : "cardLightMode";

  return (
    <div className={`card mt-3 ${styles.policyCont} ${colorMode}`}>
      <div>
        <span>Privacy</span><br />
        <span>Accessibility</span><br />
        <span>Careers</span>
      </div>
      <div>
        <span>About</span><br />
        <span>Legal</span><br />
        <span>Contact</span>
      </div>
    </div>
  );
};

export default PolicyBox;
