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

const RegisterPage: React.FC<IProps> = ({
  setLoggedIn,
  userInfo,
  setUserInfo,
}) => {
  //STATE
  const [userInput, setUserInuput] = useState<IState>(initState);
  const [taken, setTaken] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  //HELPER FUNCTIONS
  const register = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const res = await fetch("http://localhost:5000/register", {
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
      setLoggedIn(true);
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

  return (
    <CardWrapper>
      <div className="card mt-3 regCard">
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
        {taken && (
          <div>
            <div>Username Taken</div>
            <br />
          </div>
        )}
        <button className="btn btn-primary" onClick={register}>
          Register
        </button>
      </div>
    </CardWrapper>
  );
};

export default RegisterPage;
