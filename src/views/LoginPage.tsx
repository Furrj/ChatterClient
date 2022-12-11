import React, { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

//LAYOUTS
import CardWrapper from "../layouts/CardWrapper";

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
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

const LoginPage: React.FC<IProps> = ({
  setLoggedIn,
  userInfo,
  setUserInfo,
}) => {
  //Init State
  const [userInput, setUserInuput] = useState<IState>(initState);
  const [invalidInfo, setInvalidInfo] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  //Helper Functions
  const login = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<any> => {
    //FETCH REQ
    const res = await fetch("http://localhost:5000/login", {
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
      setLoggedIn(true);
      setUserInfo(data);
      setInvalidInfo(false);
      return navigate("/mainfeed");
    } else {
      setInvalidInfo(true);
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInuput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CardWrapper>
      <div className="card mt-3 loginCard">
        <div>Username: </div>
        <input
          type="text"
          name="username"
          value={userInput.username}
          onChange={inputHandler}
          className="form-control"
        />
        <br />
        <div>Password:</div>
        <input
          type="text"
          name="password"
          value={userInput.password}
          onChange={inputHandler}
          className="form-control"
        />
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
    </CardWrapper>
  );
};

export default LoginPage;
