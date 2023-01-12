import React, { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { reqRoutes } from "../utils/reqRoutes";

//TS
import { IUser } from "../App";

interface IState {
  username: string;
  password: string;
}

const initState: IState = {
  username: "",
  password: "",
};

//PROPS
interface IProps {
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
  darkMode: boolean;
}

const LoginPage: React.FC<IProps> = ({
  userInfo,
  setUserInfo,
  darkMode,
}) => {
  //Init State
  const [userInput, setUserInuput] = useState<IState>(initState);
  const [invalidInfo, setInvalidInfo] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  let cardColorMode: string = darkMode ? "" : "cardLightMode";

  //Helper Functions
  const login = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<any> => {
    //FETCH REQ
    const res = await fetch(`${reqRoutes()}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });

    //RES
    const data: IUser = await res.json();
    console.log(data);
    if (data.valid) {
      setUserInfo(data);
      setInvalidInfo(false);
      return navigate("/mainfeed");
    } else {
      setInvalidInfo(true);
    }
  };

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const password = document.querySelector("#password");
    if (password) {
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);
    }
    const eye = document.querySelector("#eye");
    if (eye) {
      if (eye.classList.contains("fa-eye-slash")) {
        eye.classList.remove("fa-eye-slash");
      } else {
        eye.classList.toggle("fa-eye-slash");
      }
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInuput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`${styles.loginCont}`}>
      <div className={`card mt-3 ${styles.loginCard} ${cardColorMode}`}>
        <div>Username: </div>
        <input
          type="text"
          name="username"
          value={userInput.username}
          onChange={inputHandler}
          className="form-control"
        />
        <br />
        <div className={styles.passwordCont}>
          <div>Password:</div>
          <input
            type="password"
            name="password"
            id="password"
            value={userInput.password}
            onChange={inputHandler}
            className="form-control"
          />
          <i
            className={`fa-solid fa-eye fa-eye-slash ${styles.eye}`}
            id="eye"
            onClick={togglePassword}
          />
        </div>
        <br />
        {invalidInfo && (
          <div>
            <div>Invalid Login Information</div>
            <br />
          </div>
        )}
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
