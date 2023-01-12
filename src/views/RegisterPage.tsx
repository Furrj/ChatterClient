import React, { useState, useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { reqRoutes } from "../utils/reqRoutes";

//TS
import { IUser } from "../App";

interface IState {
  username: string;
  password: string;
  password2: string;
}

const initState: IState = {
  username: "",
  password: "",
  password2: "",
};

//PROPS
interface IProps {
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
  darkMode: boolean;
}

const RegisterPage: React.FC<IProps> = ({
  userInfo,
  setUserInfo,
  darkMode,
}) => {
  const [userInput, setUserInuput] = useState<IState>(initState);
  const [taken, setTaken] = useState<boolean>(false);
  const [invalidPasswords, setInvalidPasswords] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  let colorMode: string = darkMode ? "" : "cardLightMode";

  useEffect(() => {
    if (
      userInput.password !== userInput.password2 &&
      userInput.password2 !== ""
    ) {
      setInvalidPasswords(true);
    } else if (userInput.password === userInput.password2) {
      setInvalidPasswords(false);
    }
  }, [userInput]);

  //HELPER FUNCTIONS
  const register = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const res = await fetch(`${reqRoutes()}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data: IUser = await res.json();
    if (!data.valid) {
      setTaken(true);
    } else {
      setTaken(false);
      setUserInfo(data);
      return navigate("/");
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInuput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword1 = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const password1 = document.querySelector("#password1");
    if (password1) {
      const type =
        password1.getAttribute("type") === "password" ? "text" : "password";
      password1.setAttribute("type", type);
    }
    const eye1 = document.querySelector("#eye1");
    if (eye1) {
      if (eye1.classList.contains("fa-eye-slash")) {
        eye1.classList.remove("fa-eye-slash");
      } else {
        eye1.classList.toggle("fa-eye-slash");
      }
    }
  };

  const togglePassword2 = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const password2 = document.querySelector("#password2");
    if (password2) {
      const type =
        password2.getAttribute("type") === "password" ? "text" : "password";
      password2.setAttribute("type", type);
    }
    const eye2 = document.querySelector("#eye2");
    if (eye2) {
      if (eye2.classList.contains("fa-eye-slash")) {
        eye2.classList.remove("fa-eye-slash");
      } else {
        eye2.classList.toggle("fa-eye-slash");
      }
    }
  };

  return (
    <div className={styles.regCont}>
      <div className={`card mt-3 ${styles.regCard} ${colorMode}`}>
        <div>Username: </div>
        <input
          type="text"
          name="username"
          value={userInput.username}
          onChange={inputHandler}
          className="form-control"
        />
        <br />
        {taken && (
          <div>
            <div>Username Taken</div>
            <br />
          </div>
        )}
        <div className={styles.passwordCont}>
          <div>Password:</div>
          <input
            type="password"
            name="password"
            id="password1"
            value={userInput.password}
            onChange={inputHandler}
            className="form-control"
          />
          <i
            className={`fa-solid fa-eye fa-eye-slash ${styles.eye}`}
            id="eye1"
            onClick={togglePassword1}
          />
        </div>
        <br />
        <div className={styles.passwordCont}>
          <div>Confirm Password:</div>
          <input
            type="password"
            name="password2"
            id="password2"
            value={userInput.password2}
            onChange={inputHandler}
            className="form-control"
          />
          <i
            className={`fa-solid fa-eye fa-eye-slash ${styles.eye}`}
            id="eye2"
            onClick={togglePassword2}
          />
        </div>
        <br />
        {invalidPasswords && (
          <div>
            <div>Passwords must match</div>
            <br />
          </div>
        )}
        <button className="btn btn-primary" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
