import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginRegisterCard.module.css";

const LoginRegisterCard: React.FC = () => {
  return (
    <div className={`card ${styles.card}`}>
      Login or register to make a chat!
    </div>
  );
};

export default LoginRegisterCard;
