import React from "react";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const toggleMode = () => {
    document.body.classList.toggle("light-mode");
  };

  return (
    <div>
      <button onClick={toggleMode}>Toggle Mode</button>
    </div>
  );
};

export default HomePage;
